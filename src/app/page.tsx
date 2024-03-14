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

export default function Home() {

  const [card, setCard] = useState('login')
  const {user, userAction} = useUserStore((state) => state)


  useEffect(() => {
    Cookies.get('user')
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
          {/* {
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
          } */}
          <ChatCard/>
        </div>
      </main>
      <Toaster />
    </>
  );
}
