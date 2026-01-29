import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/db";
import { User } from "@/models/User";
import { Transaction } from "@/models/Transaction";
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
      // @ts-ignore
      const couponCode = order.notes?.couponApplied;
      const amount = (Number(order.amount) || 0) / 100; // Convert paise to currency
      
      const updateData: any = {
         $inc: { credits: creditsToAdd }
      };
      
      if (couponCode && couponCode !== 'none') {
         updateData.$addToSet = { usedCoupons: couponCode };
      }

      const updatedUser = await User.findOneAndUpdate(
         // @ts-ignore
        { _id: session.user.id }, 
        updateData,
         { new: true }
      );

      // Record Transaction
      await Transaction.create({
          // @ts-ignore
          userId: session.user.id,
          amount: amount,
          credits: creditsToAdd,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          status: "success"
      });

      return NextResponse.json({ 
        success: true, 
        credits: updatedUser.credits 
      });
    } else {
      // Record Failed Transaction (Optional, but good practice if we had the order details earlier)
      // Since we fail signature check, we might not want to trust the input enough to DB log, or we log it as failed attempt.
      // For now, only logging success as requested ("List all payments done").
      return NextResponse.json({ success: false, error: "Invalid Signature" }, { status: 400 });
    }
  } catch (error) {
    console.error("Payment verification failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
