import { User } from '@/types'
import Cookies from 'js-cookie'
import { create } from 'zustand'

interface UserState {
    user: User,
    userAction: (props: User) => void
}

const emptyObject = {
    username: '',
    fullname: '',
    email: '',
    avatar: ''
}

export const useUserStore = create<UserState>()((set) => ({
    user: emptyObject,
    userAction: (props: User) => set((state) => ({ user: props })),
}))