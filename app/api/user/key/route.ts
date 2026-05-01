import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    await dbConnect();
    // @ts-ignore
    const user = await User.findById(session.user.id);
    return NextResponse.json({ key: user?.removeBgKey || "" });
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { key } = await req.json();
        
        await dbConnect();
        // @ts-ignore
        const user = await User.findById(session.user.id);
        
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        user.removeBgKey = key;
        await user.save();

        return NextResponse.json({ success: true, key: user.removeBgKey });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
