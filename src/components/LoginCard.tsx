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
import Link from "next/link";

interface Props {
  updateSession: () => void
}

const LoginCard = ({ updateSession = () => {}}: Props) => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const {user, userAction} = useUserStore((state) => state)

  const router = useRouter()

  const handleSubmit = async () => {

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
    // <div className={`flex flex-row w-[100%] h-[70%] md:w-[70%] md:rounded-full`}>
    //   <div className={`hidden md:flex w-[60%]`}>
    //     <Image src={loginImage} alt="Login image" />
    //   </div>
    //   <div className="flex flex-col w-[100%] md:w-[40%]">
    //     <div className={`flex flex-col px-10 py-4 bg-[#202C33] h-full`}>
    //       <form action={handleSubmit}>
    //         <Container>
    //           <span className="font-bold text-2xl text-center">Login</span>
    //         </Container>
    //         <Container>
    //           <TextInput type="text" label={'Username'} name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
    //         </Container>
    //         <Container>
    //           <TextInput type="password" label={'Password'} name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
    //         </Container>
    //         <Container>
    //           <Button text="Login" onClick={handleSubmit} loading={loading} disabled/>
    //         </Container>
    //       </form>

    //       <Container>
    //         Doesnt Have Account? <span onClick={updateSession} className="text-blue-500 cursor-pointer"> Register</span>
    //       </Container>
    //     </div>
    //   </div>
    // </div>
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Left panel with illustration/brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 flex-col items-center justify-center p-12 text-white">
        <div className="max-w-md">
          {/* <MessageCircle size={64} className="mb-8" /> */}
          <h1 className="text-4xl font-bold mb-6">Connect with friends and teams</h1>
          <p className="text-lg opacity-90">
            Join thousands of users who trust ChatApp for their daily communication. 
            Fast, secure, and designed for modern teams.
          </p>
        </div>
      </div>

      {/* Right panel with login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center lg:hidden mb-6">
              {/* <MessageCircle size={40} className="text-blue-600" /> */}
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-gray-600">Please sign in to your account</p>
          </div>

          {/* {error && (
            <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )} */}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="you@example.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-indigo-500">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="font-medium text-blue-600 hover:text-indigo-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
