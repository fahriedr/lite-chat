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
    createdAt: string
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