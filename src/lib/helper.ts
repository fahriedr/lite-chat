// 'use server'
import { CustomResponse, CustomError, ErrorDetails } from '@/types'
import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios'
import bcrypt from 'bcryptjs'
import Cookies from 'js-cookie'
import moment from 'moment'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import { ZodIssue } from 'zod'

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