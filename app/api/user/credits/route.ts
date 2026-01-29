import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: Request) {
     const session = await getServerSession(authOptions);
     if (!session || !session.user) {
         return NextResponse.json({ credits: 0, authenticated: false });
     }
     
     await dbConnect();
     // @ts-ignore
     const user = await User.findById(session.user.id);
     return NextResponse.json({ credits: user?.credits || 0, authenticated: true });
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    // @ts-ignore
    const user = await User.findById(session.user.id);
    
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.credits > 0) {
        user.credits -= 1;
        await user.save();
        return NextResponse.json({ success: true, remainingCredits: user.credits });
    } else {
        return NextResponse.json({ error: "Insufficient credits" }, { status: 403 });
    }
}
