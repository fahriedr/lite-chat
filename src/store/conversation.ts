import { create } from 'zustand'

interface Conversation {
    _id: string
    name: string,
    friendId: string,
    friendAvatar: string
}

interface conversationState {
    conversation: Conversation | null,
    loading: boolean,
    conversationAction: (props: Conversation) => void
    conversationLoadingAction: () => void
}

export const useConversationStore = create<conversationState>()((set) => ({
    conversation: null,
    loading: true,
    conversationLoadingAction: () => set((state) => ({ loading: true})),
    conversationAction: (props: Conversation) => set((state) => ({ conversation: props, loading: false })),
}))