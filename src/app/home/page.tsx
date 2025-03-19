"use client"

import ChatCard from '@/components/Home/ChatCard'
import Loading from '@/components/UI/Loading'
import { checkAuth } from '@/lib/helper'
import { useUserStore } from '@/store/user'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

export default function Home({ }: Props) {
    const router = useRouter()
    const [loading, setLoading] = React.useState<boolean>(true)
    const { userAction } = useUserStore((state) => state)

    const checkUser = React.useCallback(async () => {
        const user = await checkAuth()
        if (!user) {
            router.push("/login")
        } else {
            userAction(user)
            setLoading(false)
        }
    }, [router, userAction])

    React.useEffect(() => {
        checkUser()
    }, [checkUser])

    if (loading) {
        return (
            <div className='w-full h-screen flex flex-col justify-center items-center'>
                <Loading />
            </div>
        )
    }

    return (
        <div className='w-full h-screen'>
            <ChatCard />
        </div>
    )
}
