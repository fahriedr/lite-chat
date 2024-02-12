import { connectToDatabase } from "@/lib/database";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export const GET = async (req: NextRequest) => {

    try {


        console.log('hehe')

        await connectToDatabase()

        // const param = await req.json()
        
        console.log(req.headers.get('Authorization'))

        return NextResponse.json({
            data: 'param'}) 

        // const user = User.findOne({ _id: param.id}).exec()

        // return NextResponse.json({
        //     success: true,
        //     data: user
        // })
        
    } catch (error) {
        console.log(error)
        return new NextResponse("Something went wrong", { status: 500})
    }
}