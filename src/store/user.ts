import { User } from '@/types'
import Cookies from 'js-cookie'
import { create } from 'zustand'

interface UserState {
    user: User | null,
    userAction: (props: User) => void
}

const initialState: User = {
    username: '',
    fullname: '',
    email: '',
    avatar: ''
}

export const useUserStore = create<UserState>()((set) => ({
    user: null,
    userAction: (props: User) => set((state) => ({ user: props })),
}))