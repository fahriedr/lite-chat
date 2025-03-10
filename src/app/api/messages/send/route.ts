import { connectToDatabase } from "@/lib/database";
import { getPlainId } from "@/lib/helper";
import Conversation from "@/models/Conversation";
import Message from "@/models/Message";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
    userId: z.string().min(1).trim(),
    message: z.string().min(1),
  });

export const POST = async (req: NextRequest) => {

    try {
        await connectToDatabase();
        const senderId = req.headers.get("x-user-id")
        const body = await req.json();
        const message = body.message
        const validate = schema.safeParse(body);

        if (!validate.success) {
            return NextResponse.json(validate.error.format(), { status: 400 });
        }

        const validateUserId = await User.findById(body.userId).exec()
        const receiverId = await getPlainId(validateUserId._id)

        if(!validateUserId) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        } else if(receiverId === senderId) {
            return NextResponse.json(
                { success: false, message: "User Id not valid" },
                { status: 400 }
            );
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId]}
        })

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }
        
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage) {
            conversation.messages.push(newMessage._id)
        }

        await Promise.all([conversation.save(), newMessage.save()])

        return NextResponse.json({
            success: true,
            message: 'Message sent successfully',
            data: newMessage
        })

    } catch (error) {
        console.log(error)
        return new NextResponse("Something went wrong", { status: 500})
    }
}