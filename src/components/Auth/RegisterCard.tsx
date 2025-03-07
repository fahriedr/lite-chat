'use client';
import Image from "next/image";
import React, { useState } from "react";
import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import TextInput from "@/components/UI/TextInput";
import loginImage from "../../public/images/login.png";
import { registerApi } from "@/utils/api/authApi";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

interface Props {
  updateSession: () => void
}

const RegisterCard = ({ updateSession = () => {}}: Props) => {

  const [username, setUsername] = useState('')
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  // const router = useRouter()

  const onRegister = async () => {

    const res = await registerApi({
      data: {
        fullname: fullname,
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      } 
    })

    Cookies.set('token', res?.data.token)

    setLoading(false)

    // router.push('/profile')

  }
  return (
    <div className={`flex flex-row w-[100%] h-[70%] md:w-[70%] md:rounded-full`}>
      <div className={`hidden md:flex w-[60%]`}>
        <Image src={loginImage} alt="Login image" />
      </div>
      <div className="flex flex-col w-[100%] md:w-[40%]">
        <div className={`flex flex-col px-10 py-4 bg-[#202C33] h-full`}>
          <Container>
            <span className="font-bold text-2xl text-center">Register</span>
          </Container>
          <Container>
            <TextInput type="text" label={'Fullname'} name="username" value={fullname} onChange={(e) => setFullname(e.target.value)}/>
          </Container>
          <Container>
            <TextInput type="text" label={'Username'} name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </Container>
          <Container>
            <TextInput type="text" label={'Email'} name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </Container>
          <Container>
            <TextInput type="password" label={'Password'} name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </Container>
          <Container>
            <TextInput type="password" label={'Confirm Password'} name="confirmPassowrd" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          </Container>
          <Container>
            <Button text="Login" onClick={onRegister}>
            </Button>
          </Container>

          <Container>
            Already have an Account? <span onClick={updateSession} className="text-blue-500 cursor-pointer"> Login</span>
          </Container>
        </div>
      </div>
    </div>
  )
}

export default RegisterCard