import axios, { AxiosRequestHeaders } from 'axios'
import bcrypt from 'bcryptjs'

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

export const fetchApi = async (props: FetchProps) => {

    let headers = {
        'Content-Type': 'application/json',
    }

    if (localStorage.getItem('token')) {
        const authStorage = JSON.parse(localStorage.getItem('token')!)
        headers['Authorization'] = 'Bearer ' + authStorage.token
    }

    let data = {}

    if(props.data) {
        data = props.data
    }
    
    const res = await axios({
        url: props.url,
        method: props.method,
        data: data,
        headers: headers
    })

    return res
}