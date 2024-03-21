import { connectToDatabase } from "@/lib/database";
import { getPlainId } from "@/lib/helper";
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
        const _id = req.cookies.get('user_id')?.value
        const body = await req.json();

        const validate = schema.safeParse(body);

        const validateUserId = await User.findById(validate.data?.userId).exec()
        const receiverId = await getPlainId(validateUserId._id)

        if(!validateUserId) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        } else if(receiverId === _id) {
            return NextResponse.json(
                { success: false, message: "User Id not valid" },
                { status: 400 }
            );
        }

        // console.log(validateUserId, 'ss')

        return NextResponse.json({
            success: true,
            // data: user
        })
    } catch (error) {
        console.log(error)
        return new NextResponse("Something went wrong", { status: 500})
    }
}