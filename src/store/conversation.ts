import { Message, User } from '@/types'
import { create } from 'zustand'

interface SelectedConversation {
    _id: string
    name: string,
    friendId: string,
    friendAvatar: string
}

interface Participant {
    _id: string,
    avatar: string,
    createdAt: string,
    email: string,
    fullname: string,
    updatedAt: string,
    username: string
  }

interface Conversation {
    id: string,
      createdAt: string,
      updatedAt: string,
      participants: Array<Participant>,
      messages: Array<Message>,
}

interface conversationState {
    selectedConversation: SelectedConversation | null,
    conversation: Conversation[] | [],
    loading: boolean,
    setSelectedConversation: (props: SelectedConversation) => void,
    conversationAction: (props: Conversation[]) => void
    conversationLoadingAction: () => void
    resetConversation: () => void
}

export const useConversationStore = create<conversationState>()((set) => ({
    selectedConversation: null,
    conversation: [],
    loading: true,
    setSelectedConversation: (props: SelectedConversation) => set((state) => ({selectedConversation: props})),
    conversationLoadingAction: () => set((state) => ({ loading: false})),
    conversationAction: (props: any) => set((state) => ({ conversation: props, loading: false })),
    resetConversation: () => set((state) => ({conversation: []}))
}))