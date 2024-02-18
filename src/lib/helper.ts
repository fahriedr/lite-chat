import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios'
import bcrypt from 'bcryptjs'
import Cookies from 'js-cookie'

interface FetchProps {
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: object
}

export interface CustomResponse {
    message: string,
    success: boolean,
    data?: any
}

export const hashPassword = async (password: string) => {

    const hash = await bcrypt.hash(password, 10)

    return hash
}

export const comparePassword = async (password: string, hash: string) => {

    const check = await bcrypt.compare(password, hash)

    return check
}

export const fetchApi = async (props: FetchProps) => {

    try {
        let headers = {
            'Content-Type': 'application/json',
        }
    
        if (Cookies.get('token')) {
            const token = Cookies.get('token')
            headers['Authorization'] = 'Bearer ' + token
        }
    
        let data = {}
    
        if(props.data) {
            data = props.data
        }
        
        const res: AxiosResponse = await axios({
            url: props.url,
            method: props.method,
            data: data,
            headers: headers
        })

        const response: CustomResponse  = {
            message: res.data.message,
            success: true,
            data: res.data
        }

        return response
        
    } catch (error: unknown) {

        if(axios.isAxiosError(error)) {
            const response: CustomResponse = {
                message: error.response?.data.message,
                success: false
            }
            return response
        } else if (error instanceof Error) {
            console.log(error)
        } else {
            console.log(error)
        }
    }
}