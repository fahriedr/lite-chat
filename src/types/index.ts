export interface User {
    fullname: string,
    username: string,
    email: string,
    avatar: string
}

export interface CustomeResponse {
    message: string,
    success: boolean,
    data?: any
}