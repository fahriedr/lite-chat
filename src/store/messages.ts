import { Message } from '@/types'
import Cookies from 'js-cookie'
import { create } from 'zustand'

interface MessagesState {
    messages: Array<Message> | Array<[]>,
    messageAction: (props: Array<Message>) => void
}

const initialState = []

export const useMessageStore = create<MessagesState>()((set) => ({
    messages: [],
    messageAction: (props: Array<Message>) => set((state) => ({ messages: props })),
}))