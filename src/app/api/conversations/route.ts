import { connectToDatabase } from "@/lib/database";
import Conversation from "@/models/Conversation";
import Message from "@/models/Message";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {

        await connectToDatabase()

        const _id = req.headers.get("x-user-id")

        if (!_id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        console.log(_id, '_id')
        
        const conversation = await Conversation.find({
            participants: { $in: [_id]},
        },
        {"messages": {$slice: -1}})
        .populate({
            path: 'participants',
            match: {_id: { $ne: _id}}
        })
        .populate({
            path: 'messages',
            model: Message
        })

        return NextResponse.json({
            success: true,
            data: conversation
        })
        
    } catch (error) {
        console.log(error)
        return new NextResponse("Something went wrong", { status: 500})
    }
}