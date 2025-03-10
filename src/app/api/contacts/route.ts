import { connectToDatabase } from "@/lib/database";
import Conversation from "@/models/Conversation";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {

        await connectToDatabase()

        const _id = req.headers.get("x-user-id")
        
        const conversation = await Conversation.find({
            participants: { $in: [_id]},
        }).populate('participants')
        .populate('messages')

        return NextResponse.json({
            success: true,
            data: conversation
        })
        
    } catch (error) {
        console.log(error)
        return new NextResponse("Something went wrong", { status: 500})
    }
}