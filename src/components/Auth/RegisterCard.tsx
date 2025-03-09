'use client';
import React, { useState } from "react";
import TextInput from "@/components/UI/TextInput";
import { registerApi } from "@/utils/api/authApi";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z, ZodError, ZodFormattedError } from 'zod'
import toast from "react-hot-toast";

interface Props {
  
}



const RegisterCard = ({ }: Props) => {

  const schema = z.object({
    fullname: z.string().min(6).max(30),
    username: z.string().min(6).max(12).trim(),
    email: z.string().email(),
    password: z.string().min(6).max(30),
    confirmPassword: z.string().max(30)
  }).superRefine(({confirmPassword, password}, ctx) => {
      if(confirmPassword !== password) {
          ctx.addIssue({
              code: 'custom',
              message: 'Password not match!'
          })
      }
  })

  const router = useRouter()

  const [username, setUsername] = useState('')
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<any>()

  const handleSubmit = async () => {

    const data = {
      fullname: fullname,
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    } 

    const validate = schema.safeParse(data)

    if(!validate.success){
      toast.error('something error')
      setErrors(validate.error.format())
      return 
    }

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

  }
  return (
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

          <div className="space-y-6">

            <TextInput
              id="fullname"
              label="Fullname"
              type="text"
              onChange={setFullname}
              value={fullname}
              placeholder="John Elton"
              error={errors}
            />

            <TextInput
              id="username"
              label="Username"
              type="text"
              onChange={setUsername}
              value={username}
              placeholder="john123"
              error={errors}
            />

            <TextInput
              id="email"
              label="Email"
              type="email"
              onChange={setEmail}
              value={email}
              placeholder="you@example.com"
              error={errors}
            />

            <TextInput
              id="password"
              label="Password"
              type="password"
              onChange={setPassword}
              value={password}
              placeholder="••••••••"
              error={errors}
            />

            <TextInput
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              onChange={setConfirmPassword}
              value={confirmPassword}
              placeholder="••••••••"
              error={errors}
            />

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
              onClick={handleSubmit}
              type="button"
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
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-blue-600 hover:text-indigo-500">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterCard