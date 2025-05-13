import { NextRequest, NextResponse } from "next/server";
import { custom, z } from 'zod'
import {connectToDatabase} from '@/lib/database'
import User from '@/models/User'
import { CustomErrorResponse, CustomSuccessResponse, hashPassword } from "@/lib/helper";
import jwt from 'jsonwebtoken'
import { zodErrorResponse } from "@/lib/helper";

const schema = z.object({
    fullname: z.string().min(6).max(30),
    username: z.string().min(6).max(12).trim(),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string()
}).superRefine(({confirmPassword, password}, ctx) => {
    if(confirmPassword !== password) {
        ctx.addIssue({
            code: 'custom',
            message: 'Password not match!'
        })
    }
})

export const POST = async (req: NextRequest, res: NextResponse) => {

    try {

        await connectToDatabase()
        const body = await req.json()
        const validate = schema.safeParse(body)

        if(!validate.success){
            return zodErrorResponse(validate.error)
        }

        const user = await User.findOne({ $or: [
            { username: body.username },
            { email: body.email }
        ]}).exec()

        if(user) {
            console.log(user, 'user')
            return CustomErrorResponse('Username or email already exists', 400)
        }

        let data = await User.create({
            fullname: body.fullname,
            username: body.username,
            email: body.email,
            password: await hashPassword(body.password),
            avatar: process.env.ROBOHASH_URL + body.username,
            provider: null,
            email_verified: false,
            google_id: null,
            github_id: null
        })

        const token = jwt.sign({
            _id : data._id 
        },process.env.SECRET_KEY!,{
            expiresIn: "1h"
        })

        const res = {
            _id: data._id,
            fullname: data.fullname,
            username: data.username,
            email: data.email,
            avatar: data.avatar,
        }

        return CustomSuccessResponse('Success', 200, 
            {
                user: res,
                token: token
            }
        )
    } catch (error) {
        console.log(error)
        return CustomErrorResponse('Something went wrong', 500)
    }
}