import { connectToDatabase } from "@/lib/database";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {

    try {

        await connectToDatabase()

        const _id = req.headers.get("x-user-id")
        
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