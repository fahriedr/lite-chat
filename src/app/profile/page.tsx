'use client'
import { checkAuth, logout } from '@/lib/helper';
import { User } from '@/types';
import { getProfileApi } from '@/utils/api/userApi';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useUserStore } from '../../store/user';
import Button from '../components/Button';

const Profile = () => {

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const {user, userAction} = useUserStore((state) => state)

  const imageLoader = () => {
    return user.avatar
  }

  const getProfile = async () => {

    const user: User = await getProfileApi()

    userAction(user)
  }

  const logout = async () => {
    setLoading(true)
    Cookies.remove('token')

    setLoading(false)

    router.push('/')
  }

  useEffect(() => {
    getProfile()
  }, [])
  
  
  return (
    <div className='justify-center items-center m-auto h-screen w-screen px-10'>
      <div className='flex flex-col items-center w-[100%] h-[70%] bg-blue-500'>
        <span>Profile Page</span>
        <Image loader={imageLoader} src='me.png' alt="profile image" width={100} height={100}/>
        <span>{user.fullname}</span>
        <span>{user.username}</span>
        <span>{user.email}</span>
        <Button text='Logout' onClick={logout} loading={loading}/>
      </div>
      

    </div>
  )
}

export default Profile