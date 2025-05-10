import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io"

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
    isRead?: boolean,
    createdAt: string
}

export interface Participant {
    _id: string,
    avatar: string,
    createdAt: string,
    email: string,
    fullname: string,
    updatedAt: string,
    username: string
  }

export interface Conversation {
    id?: string,
    createdAt: string,
    updatedAt: string,
    participants: Participant,
    messages: Message[],
    lastMessage?: string
    unreadMessage: number
}

export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}
  
export interface ClientToServerEvents {
    hello: () => void;
}
  
export interface InterServerEvents {
    ping: () => void;
}
  
export interface SocketData {
    name: string;
    age: number;
}

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer
        }
    }
}

export interface ErrorDetails {
    field: string | number
    code: string
    message: string
}

export interface CustomError {
    success: boolean
    statusCode: number
    message: string
    details?: ErrorDetails[]
}

export enum ErrorAuthProvider {
    USER_MISMATCH = "user-mismatch",
    PROVIDER_MISMATCH = "provider-mismatch",
    AUTHENTICATION_FAILED = "authentication-failed",
    INVALID_PROFILE = "invalid-profile",
    SERVER = 'server-error'
}

export const ErrorAuthProviderMessages: Record<ErrorAuthProvider, string> = {
    [ErrorAuthProvider.USER_MISMATCH]: "The user account does not match the authentication provider.",
    [ErrorAuthProvider.PROVIDER_MISMATCH]: "The selected provider does not match. Try with other provider.",
    [ErrorAuthProvider.AUTHENTICATION_FAILED]: "Authentication failed. Please try again.",
    [ErrorAuthProvider.INVALID_PROFILE]: "The user profile is invalid or incomplete.",
    [ErrorAuthProvider.SERVER]: "A server error occurred. Please try again later."
};