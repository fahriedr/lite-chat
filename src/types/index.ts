export interface User {
    _id?: string,
    fullname: string,
    username: string,
    email: string,
    avatar: string,
    password?: string,
    createdAt?: string,
    updatedAt?: string
}

export interface CustomResponse {
    message: string,
    success: boolean,
    data?: any
}

export interface Message {
    _id: string,
    senderId: string,
    receiverId: string,
    message: string,
    createdAt: string
}