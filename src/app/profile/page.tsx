'use client'
import { getProfileApi } from '@/utils/api/userApi';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { User, useUserStore } from '../../store/user';
import Button from '../components/Button';

const Profile = () => {

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const logout = () => {

    setLoading(true)

    Cookies.remove('token')

    setLoading(false)

    router.push('/')
  }

  const imageLoader = () => {
    return user.avatar
  }

  console.log(user.avatar, 'user')

  const getProfile = async () => {

    const user = await getProfileApi()

    console.log(user, 'user')
  }

  useEffect(() => {
    // getProfile()
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