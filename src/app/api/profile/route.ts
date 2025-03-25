import { connectToDatabase } from "@/lib/database";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Prevents static pre-rendering

export const GET = async (req: NextRequest) => {

    try {

        await connectToDatabase()

        const _id = req.headers.get("x-user-id")
        
        const user = await User.findById(_id).exec()

        return NextResponse.json({
            success: true,
            data: user,
            message: 'Data successfully retreive'
        })
        
    } catch (error) {
        console.log(error)
        return new NextResponse("Something went wrong", { status: 500})
    }
}