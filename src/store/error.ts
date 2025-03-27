import { User } from '@/types'
import Cookies from 'js-cookie'
import { create } from 'zustand'

interface ErrorState {
    isError: boolean
    errorMessage: string | null
    setError: () => void
}

export const useError = create<ErrorState>((set) => ({
    isError: false,
    errorMessage: null,
    setError: () => set((state) => ({ isError: true })),
}))