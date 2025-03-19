import { Message } from '@/types'
import { create } from 'zustand'

interface MessagesState {
    messages: Message[],
    setMessage: (props: Message[]) => void,
    addMessage: (props: Message) => void
}

const initialState: Message[] = []

export const useMessageStore = create<MessagesState>((set) => ({
    messages: initialState,
    setMessage: (props: Message[]) => {
        set((state) => ({ 
            messages: props
        }))
    },
    addMessage: (props: any) => {
        set((state) => ({
            messages: [...state.messages, props]
        }))
    }
}))