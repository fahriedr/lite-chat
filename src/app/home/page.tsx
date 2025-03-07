"use client"

import ChatCard from '@/components/Home/ChatCard'
import Loading from '@/components/UI/Loading'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

export default function Home({ }: Props) {
    const router = useRouter()
    const [loading, setLoading] = React.useState<boolean>(true)

    const checkUser = async () => {
        const user = await Cookies.get('user')
        if (!user) {
            router.push("/login")
        } else {
            setLoading(false) // Only set loading false if user is found
        }
    }

    React.useEffect(() => {
        checkUser()
    }, [])

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
