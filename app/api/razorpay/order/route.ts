import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getPlan, calculateDiscountedAmount } from "@/lib/payment-config";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { planId, couponCode } = await req.json();
    const plan = getPlan(planId);
    
    // Calculate final amount centrally
    const finalAmount = calculateDiscountedAmount(plan.amount, couponCode);

    const options = {
      amount: finalAmount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        planId: planId || 'starter',
        credits: plan.credits,
        couponApplied: couponCode || 'none'
      }
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Error creating order" }, { status: 500 });
  }
}
