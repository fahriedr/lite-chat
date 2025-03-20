import { connectToDatabase } from "@/lib/database";
import Conversation from "@/models/Conversation";
import User, { IUser } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Prevents static pre-rendering

export const GET = async (req: NextRequest) => {
    try {

        await connectToDatabase()

        const _id = req.headers.get("x-user-id")
        const query = req.nextUrl.searchParams.get('query')
        
        const users = await User.find({
            _id: {$ne: _id},
            $or: [
                {
                    username: {
                        $regex: '.*' + query + '.*'
                    }
                },
                {
                    email: {
                        $regex: '.*' + query + '.*'
                    }
                }
            ]
        }).lean<IUser>()

        return NextResponse.json({
            success: true,
            data: users
        })
        
    } catch (error) {
        console.log(error)
        return new NextResponse("Something went wrong", { status: 500})
    }
}