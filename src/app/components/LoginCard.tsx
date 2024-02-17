'use client';
import Image from "next/image";
import React, { useState } from "react";
import Button from "./Button";
import Container from "./Container";
import TextInput from "./TextInput";
import loginImage from "../../../public/images/login.png";
import { loginApi } from "@/lib/fetch";

const LoginCard = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = async () => {

    const res = await loginApi({ 
      url: '/api/login', 
      method: 'POST', 
      data: {
        username: username,
        password: password
      } 
    })

    console.log(res, 'here')

  }

  return (
    <div className={`flex flex-row w-[100%] h-[70%] md:w-[70%] md:rounded-full`}>
      <div className={`hidden md:flex w-[60%]`}>
        <Image src={loginImage} alt="Login image" />
      </div>
      <div className="flex flex-col w-[100%] md:w-[40%]">
        <div className={`flex flex-col px-10 py-4 bg-[#202C33] h-full`}>
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
            <Button text="Login" onClick={onLogin}>
            </Button>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
