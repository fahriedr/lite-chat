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
    const senderId = req.headers.get("x-user-id");
    const body = await req.json();
    const { message, userId } = body;

    const validate = schema.safeParse(body);
    if (!validate.success) {
      return NextResponse.json(validate.error.format(), { status: 400 });
    }

    // Run User lookup and plain ID extraction in parallel
    const receiverData = await User.findById(userId).lean();
    if (!receiverData) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const receiverId = await getPlainId(receiverData._id);
    if (receiverId === senderId) {
      return NextResponse.json(
        { success: false, message: "User Id not valid" },
        { status: 400 }
      );
    }

    // Create message instance (not saving yet)
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // Upsert conversation & push message reference without loading full doc
    await Conversation.updateOne(
      { participants: { $all: [senderId, receiverId] } },
      {
        $setOnInsert: { participants: [senderId, receiverId] },
        $push: { messages: newMessage._id },
        $set: { updatedAt: new Date() },
      },
      { upsert: true }
    );

    // Save message
    await newMessage.save();

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
};
