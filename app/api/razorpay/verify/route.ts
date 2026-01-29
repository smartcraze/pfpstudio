import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/db";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import Razorpay from "razorpay";
import { authOptions } from "../../auth/[...nextauth]/route";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      await dbConnect();
      
      // Fetch order details to reliably get credit amount
      const order = await razorpay.orders.fetch(razorpay_order_id);
      // @ts-ignore
      const creditsToAdd = Number(order.notes?.credits || 10);
      
      const updatedUser = await User.findOneAndUpdate(
         // @ts-ignore
        { _id: session.user.id }, 
         { $inc: { credits: creditsToAdd } },
         { new: true }
      );

      return NextResponse.json({ 
        success: true, 
        credits: updatedUser.credits 
      });
    } else {
      return NextResponse.json({ success: false, error: "Invalid Signature" }, { status: 400 });
    }
  } catch (error) {
    console.error("Payment verification failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
