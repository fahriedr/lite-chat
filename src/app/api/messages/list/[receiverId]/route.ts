import { connectToDatabase } from "@/lib/database";
import Conversation from "@/models/Conversation";
import User from "@/models/User";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, context: { params: {receiverId: String}}) => {

    try {
        await connectToDatabase();

        const receiverId = context.params.receiverId
        const senderId = req.cookies.get('user_id')?.value

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]},
        }).populate('messages')

        let messages = []

        if(conversation) {

            messages = conversation.messages
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