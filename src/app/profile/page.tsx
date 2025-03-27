'use client'
import Cookies from 'js-cookie';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useUserStore } from '../../store/user';
import Button from '../../components/UI/Button';
import { swrFetcher, FetchProps } from '@/lib/useSwr-helper';
import useSWR from 'swr';
import Loading from '@/components/UI/Loading';

const Profile = () => {

  const fetchProps: FetchProps = {
    url: '/api/profile',
    method: 'get'
  };

  const { 
    data, 
    error, 
    isLoading 
  } = useSWR(
    [fetchProps.url, fetchProps.method], 
    () => swrFetcher(fetchProps)
  );

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { user, userAction } = useUserStore((state) => state);

  const imageLoader = () => {
    return user?.avatar as any;
  };

  const logout = async () => {
    setLoading(true);
    Cookies.remove("token");
    Cookies.remove("user");
    setLoading(false);
    router.push("/login");
  };

  useEffect(() => {
    if(error) {
      redirect('/error')
    }
    userAction(data)
  }, [data]);

  return (
    <div className='justify-center items-center m-auto h-screen w-screen px-10'>
      <div className='flex flex-col items-center w-[100%] h-[70%] bg-blue-500'>
        {isLoading ? 
          <Loading/> : 
          <><span>Profile Page</span>
          {/* <Image loader={imageLoader} src='me.png' alt="profile image" width={100} height={100} /> */}
          <span>{user?.fullname}</span>
          <span>{user?.username}</span>
          <span>{user?.email}</span>
          <Button text='Logout' onClick={logout} loading={loading} /></>
        }
      </div>
    </div>
  )
}

export default Profile