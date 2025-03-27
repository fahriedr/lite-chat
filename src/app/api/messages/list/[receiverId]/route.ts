import { connectToDatabase } from "@/lib/database";
import Conversation from "@/models/Conversation";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, context: { params: {receiverId: String}}) => {

    try {
        await connectToDatabase();

        const receiverId = context.params.receiverId
        const senderId = req.headers.get("x-user-id")

        const conversation = await Conversation.findOne(
            {
                participants: {$all: [receiverId,senderId]},
            },
        ).populate({
            path: 'messages',
            options: {
                sort: { createdAt: -1 },
                limit: 50
            }
        });

        let messages = []

        if(conversation) {

            messages = conversation.messages.reverse()

        }

        return NextResponse.json({
            success: true,
            message: 'Message successfully retreived',
            data: messages
        })
    } catch (error) {
        console.log(error)
        return new NextResponse("Something went wrong", { status: 500})
    }
}