import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import { User } from "@/models/User";
import { COUPONS } from "@/lib/payment-config";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Please log in to apply coupons" }, { status: 401 });
        }

        const { couponCode } = await req.json();
        
        if (!couponCode) {
            return NextResponse.json({ error: "Coupon code is required" }, { status: 400 });
        }
        
        const code = couponCode.toUpperCase();
        const coupon = COUPONS[code as keyof typeof COUPONS];

        if (!coupon) {
            return NextResponse.json({ error: "Invalid coupon code" }, { status: 400 });
        }

        await dbConnect();
        // @ts-ignore
        const user = await User.findById(session.user.id);

        if (user.usedCoupons && user.usedCoupons.includes(code)) {
            return NextResponse.json({ error: "You have already used this coupon" }, { status: 400 });
        }

        return NextResponse.json({ 
            success: true, 
            discount: coupon.value 
        });

    } catch (error) {
        console.error("Error validating coupon:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
