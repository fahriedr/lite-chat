import { Message } from '@/types'
import { create } from 'zustand'

interface MessagesState {
    messages: Array<[]>,
    setMessage: (props: Array<[]>) => void,
    addMessage: (props: Message) => void
}

const initialState: Array<[]> = []

export const useMessageStore = create<MessagesState>((set) => ({
    messages: initialState,
    setMessage: (props: Array<[]>) => {
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