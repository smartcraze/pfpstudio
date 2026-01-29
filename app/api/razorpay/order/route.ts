import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getPlan, calculateDiscountedAmount, COUPONS } from "@/lib/payment-config";
import dbConnect from "@/lib/db";
import { User } from "@/models/User";

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

    const { planId, couponCode } = await req.json();
    const plan = getPlan(planId);
    
    // Backend Coupon Validation
    if (couponCode) {
        const code = couponCode.toUpperCase();
        if (!COUPONS[code as keyof typeof COUPONS]) {
            return NextResponse.json({ error: "Invalid coupon code" }, { status: 400 });
        }
        
        await dbConnect();
        // @ts-ignore
        const user = await User.findById(session.user.id);
        if (user.usedCoupons && user.usedCoupons.includes(code)) {
             return NextResponse.json({ error: "Coupon already used" }, { status: 400 });
        }
    }
    
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
