'use client';
import React, { useEffect, useState } from "react";
import { loginApi } from "@/utils/api/authApi";
import { toast } from 'react-hot-toast';
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import ProviderLoginButton from "../UI/ProvideLoginButton";
import { GoogleIcon } from "@/icons/Google";
import { GithubIcon } from "lucide-react";
import { setCookies } from "@/lib/helper"
import { ErrorAuthProvider, ErrorAuthProviderMessages } from "@/types";
interface Props {

}

const LoginCard = ({ }: Props) => {

  const {data} = useSession()

  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (code: string | null) => {
    switch (code) {
      case ErrorAuthProvider.AUTHENTICATION_FAILED:
        toast.error(ErrorAuthProviderMessages[ErrorAuthProvider.AUTHENTICATION_FAILED])
        return
      case ErrorAuthProvider.SERVER:
        toast.error(ErrorAuthProviderMessages[ErrorAuthProvider.SERVER])
        return 
      case ErrorAuthProvider.PROVIDER_MISMATCH:
        toast.error(ErrorAuthProvider.PROVIDER_MISMATCH)
        return 
      default:
        return null
    }
  }

  const [email, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const handleSubmit = async () => {

    setLoading(true)

    if (email.length < 1 || password.length < 1) {
      toast.error('Email and Password cannot be empty')
      setLoading(false)
      return false
    }

    const res = await loginApi({
      data: {
        email: email,
        password: password
      }
    })

    if (res?.success === false) {
      toast.error(res.message ?? 'Something went wrong')
      setLoading(false)
      return
    }

    await setCookies(res?.data.data.token, res?.data.data.user)

    router.push('/home')

  }

  useEffect(() => {
    getErrorMessage(error)
  }, [error])

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* {error && <p className="text-red-500">{getErrorMessage(error)}</p>} */}

      {/* Left panel with illustration/brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-main-color flex-col items-center justify-center p-12 text-white">
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

          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission
              handleSubmit(); // Call your submit function
            }}
            className="space-y-6"
          >
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
                value={email}
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

            {/* <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div> */}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-vibrant-purple hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center"
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

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">Or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex flex-row gap-x-4">
            <ProviderLoginButton
              icon={<GoogleIcon size={6}/>}
              name="Google"
              onClick={() => signIn("google", { callbackUrl: "/api/auth/callback/google" })}
            />

            <ProviderLoginButton
              icon={<GithubIcon size={24}/>}
              name="Github"
              onClick={() => signIn("github", { callbackUrl: "/api/auth/callback/github" })}
            />
          </div>

          <button className="bg-teal" onClick={() => signOut()}>
            Logout
          </button>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {"Dont have an account?"}
              <Link href="/signup" className="font-medium text-blue-600 hover:text-indigo-500">
                {' '}Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
