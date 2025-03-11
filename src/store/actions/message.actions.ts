"use server"

import { pusherServer } from "@/lib/pusher-helper"
import { Message } from "@/types"

export const sendMessage = async (message: Message ) => {
    try {
        pusherServer.trigger('lite-chat', 'upcoming-message', message)
    } catch (error: any) {
        throw new Error(error.message)
    }
}