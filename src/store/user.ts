import Cookies from 'js-cookie'
import { create } from 'zustand'

export interface User {
    fullname: string,
    username: string,
    email: string,
    avatar: string
}

interface UserState {
    user: undefined | null | string | User,
    userAction: (props: string) => void
}

export const useUserStore = create<UserState>()((set) => ({
    user: Cookies.get('user') == null || undefined ? null : JSON.parse(Cookies.get('user')!),
    userAction: (props: string) => set((state) => ({ user: state.user })),
}))