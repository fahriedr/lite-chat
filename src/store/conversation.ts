import { Conversation, Message, User } from '@/types'
import { create } from 'zustand'

interface SelectedConversation {
    _id?: string
    name: string,
    friendId: string,
    friendAvatar: string
}


interface conversationState {
    selectedConversation: SelectedConversation | null,
    conversation: Conversation[] | [],
    loading: boolean,
    setSelectedConversation: (props: SelectedConversation) => void,
    conversationAction: (props: Conversation[]) => void
    conversationLoadingAction: (props: boolean) => void
    resetConversation: () => void
    messageUpdate: (props: Message) => void
}

export const useConversationStore = create<conversationState>()((set) => ({
    selectedConversation: null,
    conversation: [],
    loading: false,
    setSelectedConversation: (props: SelectedConversation) => set((state) => ({ selectedConversation: props })),
    conversationLoadingAction: (props: boolean) => set((state) => ({ loading: props })),
    conversationAction: (props: any) => set((state) => ({ conversation: props})),
    resetConversation: () => set((state) => ({ conversation: [] })),
    messageUpdate: (newMessage: Message) =>
        set((state) => {
            // // Find conversation that matches either sender or receiver ID
            const conversationIndex = state.conversation.findIndex((conv) => {
                return conv.participants._id === newMessage.senderId || conv.participants._id === newMessage.receiverId
            });

            if (conversationIndex === -1) return {};

            const updatedConversation = { ...state.conversation[conversationIndex] };
            // Add new message to the beginning of messages array or replace index 0
            updatedConversation.messages = [newMessage, ...updatedConversation.messages.slice(1)];

            // Optionally move this conversation to the top (like recent chats)
            const updatedConversations = [...state.conversation];
            updatedConversations.splice(conversationIndex, 1);
            updatedConversations.unshift(updatedConversation);

            return { conversation: updatedConversations };
        })
}))