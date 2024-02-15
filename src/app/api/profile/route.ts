import { connectToDatabase } from "@/lib/database";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export const GET = async (req: NextRequest) => {

    try {

        await connectToDatabase()

        const _id = req.cookies.get('user_id')?.value
        
        const user = await User.findById(_id).exec()

        return NextResponse.json({
            success: true,
            data: user
        })
        
    } catch (error) {
        console.log(error)
        return new NextResponse("Something went wrong", { status: 500})
    }
}