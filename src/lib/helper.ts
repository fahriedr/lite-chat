import { CustomResponse, CustomError, ErrorDetails, User as UserType } from '@/types'
import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios'
import bcrypt from 'bcryptjs'
import Cookies from 'js-cookie'
import moment from 'moment'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import { ZodIssue } from 'zod'
import { Profile, Account} from "next-auth"
import User from '@/models/User'
import jwt from 'jsonwebtoken'
import { connectToDatabase } from './database'
import { cookies } from 'next/headers'

interface FetchProps {
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: object
}

export const hashPassword = async (password: string) => {

    const hash = await bcrypt.hash(password, 10)

    return hash
}

export const comparePassword = async (password: string, hash: string) => {

    const check = await bcrypt.compare(password, hash)

    return check
}

export const lastText = (text: string): string => {
    return text.length > 45 ? text.substring(0, 45) + "..." : text;
};

export const fetchApi = async (props: FetchProps) => {

    try {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': ''
        }

        const checkToken = await checkAuth()

        if (checkToken) {
            const token = Cookies.get('token')
            headers['Authorization'] = 'Bearer ' + token
        }

        let data = {}

        if (props.data) {
            data = props.data
        }

        const res: AxiosResponse = await axios({
            url: props.url,
            method: props.method,
            data: data,
            headers: headers
        })

        const response: CustomResponse | CustomError = {
            message: res.data.message,
            success: true,
            data: res.data
        }

        return response

    } catch (error: unknown) {

        if (axios.isAxiosError(error)) {
            const response: CustomResponse = {
                message: error.response?.data.message,
                success: false
            }

            if (error.response?.request.status === 401) {
                Cookies.remove('user')
                Cookies.remove('token')

                return response

            }

            return response
        } else if (error instanceof Error) {
            console.log(error)
        } else {
            console.log(error)
        }
    }
}

export const checkAuth = () => {

    const checkToken = Cookies.get('token')
    const checkUser = Cookies.get('user')

    if (!checkToken || !checkUser) {
        return false
    }

    return JSON.parse(checkUser)
}

export const logout = async () => {
    Cookies.remove('token')
    Cookies.remove('user')
    return true
}


export const getPlainId = async (id: Object) => {
    return id.toString().replace(/ObjectId\("(.*)"\)/, "$1")
}

export const zodErrorResponse = async (err: Zod.ZodError) => {

    let errorDetails: ErrorDetails[] = []

    err.issues.map((val, i) => {

        const data: ErrorDetails = {
            field: val.path[0],
            code: val.code,
            message: val.message
        }

        errorDetails.push(data)
    })

    return CustomErrorResponse(errorDetails[0].message, 400, errorDetails)

}

export const CustomErrorResponse = (message: string, statusCode: number, errorDetail?: Array<ErrorDetails>) => {

    const errorResponse: CustomError = {
        success: false,
        statusCode: statusCode,
        message: message,
        details: errorDetail
    }

    return NextResponse.json(errorResponse, {status: statusCode})
}

export const CustomSuccessResponse = (message: string, statusCode: number, data?: Array<[]> | object) => {
    return NextResponse.json({
        success: true,
        message: message,
        data: data
    }, {status: statusCode})
}

export const setCookies = async (token: string, user: UserType) => {
    Cookies.set('token', token)
    Cookies.set('user', JSON.stringify(user))
}

export const emailToUsername = async (email: string) => {
    const [localPart] = email.split('@')
    const randomDigits = Math.floor(1000 + Math.random() * 9000)
    return `${localPart}${randomDigits}`
}

export const googleAuth = async (account: Account, profile: Profile | undefined) => {

    try {
        if (!profile?.email) {
            throw new Error("No Profile")
        }
    
        console.log(profile, 'googleAuth')
    
        await connectToDatabase();
    
        const user = await User.findOne({
            email: profile.email,
            provider: "google"
        }).exec()
    
        // if (!user) {
        //     const username = await emailToUsername(profile.email)
        //     let data = await User.create({
        //         fullname: profile.name,
        //         username: username,
        //         email: profile.email,
        //         password: await hashPassword(username),
        //         avatar: process.env.ROBOHASH_URL + username,
        //         provider: 'google'
        //     })
    
        //     const token = jwt.sign({
        //         _id : data._id 
        //     },process.env.SECRET_KEY!,{
        //         expiresIn: "1h"
        //     })
    
        //     const res = {
        //         _id: data._id.toString(),
        //         fullname: data.fullname,
        //         username: data.username,
        //         email: data.email,
        //         avatar: data.avatar,
        //     }
    
        //     await setCookies(token, res)
    
        //     return CustomSuccessResponse('Success', 200, 
        //         {
        //             user: res,
        //             token: token
        //         }
        //     )
        // }

        let token
        let data
    
        if (user && user.provider === "google") {
    
            console.log(user, 'google')
    
             token = await jwt.sign(
                {
                _id: user._id,
                },
                process.env.SECRET_KEY!,
                {
                expiresIn: 60 * 60,
                }
            );
        
            data = {
                _id: user._id.toString(),
                fullname: user.fullname,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
            }
    
            await setCookies(token, data)
            console.log(checkAuth(), 'checkout')
    
    
        }

        return {token: token, user: data}

    } catch (error) {
        throw error
    }
}