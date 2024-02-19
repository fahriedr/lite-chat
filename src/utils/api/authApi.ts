import { fetchApi } from "@/lib/helper"
import axios, { AxiosError } from "axios"

interface LoginProps {
    data: {
        username: string,
        password: string
    } 
}

interface RegisterProps {
    data: {
        fullname: string,
        username: string,
        password: string,
        confirmPassword: string,
        email: string,
    }
}


export const loginApi = async (props: LoginProps) => {

    const res  = await fetchApi({
        url: '/api/login',
        method: 'POST',
        data: props.data
    })

    return res

}

export const registerApi = async (props: RegisterProps) => {

    const res = await axios({
        url: '/api/register',
        method: 'POST',
        data: props.data
    })

    return res
}