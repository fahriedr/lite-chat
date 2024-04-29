"use client"
import About from "./about/page";
import LoginCard from "../components/LoginCard";
import Head from "next/head";
import RegisterCard from "../components/RegisterCard";
import { useEffect, useState } from "react";
import {Toaster} from 'react-hot-toast';
import { useUserStore } from "@/store/user";
import Cookies from "js-cookie";
import ChatCard from "@/components/ChatCard";
import Loading from "@/components/Loading";

export default function Home() {

  const [card, setCard] = useState('login')
  const {user, userAction} = useUserStore((state) => state)

  const [loading, setLoading] = useState(false);

  const setUser = async () => {

    setLoading(true)
    const userData = Cookies.get('user')

    if(userData) {
      userAction(JSON.parse(userData))
      setLoading(false)
    }
    setLoading(false)
  }


  useEffect(() => {
    setUser()
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
        <title>
          Lite Chat | Auth
        </title>
      </Head>
      <main>
        <div className={`flex justify-center items-center m-auto h-screen w-screen px-10 py-10`}>
          { 
            loading
            ?
              <Loading/>
            :
            <>
              {
                user ? 
                <>
                  <ChatCard/>
                </> 
                : 
                <>
                  {
                    card == 'login' ? <LoginCard updateSession={() => {setCard('register')}}/> 
                    : <RegisterCard updateSession={() => {setCard('login')}}/>
                  }
                </> 
              }
            </>
          }
        </div>
      </main>
      <Toaster />
    </>
  );
}
