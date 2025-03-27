import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation'

// Define interfaces for type safety
export interface FetchProps {
    url: string;
    method: 'get' | 'post' | 'put' | 'delete';
    data?: any;
}

export const swrFetcher = async (props: FetchProps) => {
    try {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        const token = Cookies.get('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const res: AxiosResponse = await axios({
            url: props.url,
            method: props.method,
            data: props.data || {},
            headers: headers
        });

        return res.data

    } catch (error: any) {

        if(error.status === 401) {
            Cookies.remove('user');
            Cookies.remove('token');
            redirect('/login')
        } else {
            throw new Error(
                error.response?.data.message ||
                error.message ||
                'An error occurred'
            );
        }
    }
};