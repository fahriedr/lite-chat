import { connectToDatabase } from "@/lib/database";
import Conversation from "@/models/Conversation";
import Message from "@/models/Message";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Prevents static pre-rendering

export const GET = async (req: NextRequest) => {
    try {

        await connectToDatabase()

        const _id = req.headers.get("x-user-id")

        if (!_id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
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
            model: Message,
            options: {
                limit: 1,
                sort: { createdAt: -1 }
            }
        })
        .sort({
            'updatedAt': -1
        })
        .lean()

        const conversationWithObject = conversation.map(conv => ({
            ...conv,
            lastMessage: conv.messages[0].message || null,
            participants: conv.participants[0] || null
        }));

        return NextResponse.json({
            success: true,
            data: conversationWithObject,
            message: 'Data successfully retreive'
        })
        
    } catch (error) {
        console.log(error)
        return new NextResponse("Something went wrong", { status: 500})
    }
}