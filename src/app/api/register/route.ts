import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
import {connectToDatabase} from '@/lib/database'
import User from '@/models/User'
import { hashPassword } from "@/lib/helper";
import jwt from 'jsonwebtoken'

const schema = z.object({
    fullname: z.string().min(6).max(30),
    username: z.string().min(6).max(12).trim(),
    email: z.string().email(),
    password: z.string().min(6).max(30),
    confirmPassword: z.string().max(30)
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
            return NextResponse.json(validate.error.format(), {status: 400})
        }

        const user = await User.findOne({ $or: [
            { username: body.username },
            { email: body.email }
        ]}).exec()

        if(user) {
            return NextResponse.json("Username or email already exists", { status: 400 })
        }

        let data = await User.create({
            fullname: body.fullname,
            username: body.username,
            email: body.email,
            password: await hashPassword(body.password),
            avatar: process.env.ROBOHASH_URL + body.username
        })

        const token = await jwt.sign({
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

        return NextResponse.json({
            data: res,
            token : token
        })
    } catch (error) {
        console.log(error)
        return new NextResponse("Something went wrong " + error, { status: 500 })
    }
}