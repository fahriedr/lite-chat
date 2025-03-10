'use client';
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import Container from "./Container";
import TextInput from "./TextInput";
import loginImage from "../../public/images/login.png";
import { loginApi } from "@/utils/api/authApi";
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie'
import { redirect, useRouter } from "next/navigation";
import Head from "next/head";
import { useUserStore } from "@/store/user";

interface Props {
  updateSession: () => void
}

const LoginCard = ({ updateSession = () => {}}: Props) => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const {user, userAction} = useUserStore((state) => state)

  const router = useRouter()

  const onLogin = async () => {

    setLoading(true)

    if(username.length < 1 || password.length < 1) {
      toast.error('Username and Password cannot be empty')
      setLoading(false)
      return
    }


    const res = await loginApi({
      data: {
        username: username,
        password: password
      } 
    })

    if(res?.success === false){
      toast.error(res.message ?? 'Something went wrong')
      setLoading(false)

      return
    }

    Cookies.set('token', res?.data.token)
    Cookies.set('user', JSON.stringify(res?.data.data))

    userAction(res?.data.data)

  }

  return (
    <div className={`flex flex-row w-[100%] h-[70%] md:w-[70%] md:rounded-full`}>
      <div className={`hidden md:flex w-[60%]`}>
        <Image src={loginImage} alt="Login image" />
      </div>
      <div className="flex flex-col w-[100%] md:w-[40%]">
        <div className={`flex flex-col px-10 py-4 bg-[#202C33] h-full`}>
          <form action={onLogin}>
            <Container>
              <span className="font-bold text-2xl text-center">Login</span>
            </Container>
            <Container>
              <TextInput type="text" label={'Username'} name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </Container>
            <Container>
              <TextInput type="password" label={'Password'} name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Container>
            <Container>
              <Button text="Login" onClick={onLogin} loading={loading} disabled/>
            </Container>
          </form>

          <Container>
            Doesnt Have Account? <span onClick={updateSession} className="text-blue-500 cursor-pointer"> Register</span>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
