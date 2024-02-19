"use client"
import About from "./about/page";
import LoginCard from "./components/LoginCard";
import Head from "next/head";
import RegisterCard from "./components/RegisterCard";
import { useState } from "react";
import {Toaster} from 'react-hot-toast';

export default function Home() {

  const [card, setCard] = useState('login')

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
        <title>
          Lite Chat | Auth
        </title>
      </Head>
      <main>
        <div className={`flex justify-center items-center m-auto h-screen w-screen px-10`}>
          {
            card == 'login' ? <LoginCard updateSession={() => {setCard('register')}}/> 
            : <RegisterCard updateSession={() => {setCard('login')}}/>
          }
        </div>
      </main>
      <Toaster />
    </>
  );
}
