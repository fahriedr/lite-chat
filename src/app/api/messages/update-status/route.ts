import { connectToDatabase } from "@/lib/database";
import { getPlainId } from "@/lib/helper";
import Conversation from "@/models/Conversation";
import Message from "@/models/Message";
import User, { IUser } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { object, z } from "zod";
import { ObjectId } from "mongodb"

const schema = z.object({
  messageId: z.string().min(1).trim(),
});

export const POST = async (req: NextRequest) => {
    try {
        await connectToDatabase();
        const userId = req.headers.get("x-user-id");
        const body = await req.json();
        const { messageId } = body;

        const validate = schema.safeParse(body);
        if (!validate.success) {
            return NextResponse.json(validate.error.format(), { status: 400 });
        }

        // // Check message
        const message = await Message.findOne({
            _id: messageId
        }).exec()

        if(userId !== message.receiverId.toString()) {
            return new NextResponse("Error processing data", { status: 400 });
        }

        message.isRead = true

        await message.save()

        return NextResponse.json({
            success: true,
            message: "Success"
        });
    } catch (error) {
        console.error(error);
        return new NextResponse("Something went wrong", { status: 500 });
    }
};