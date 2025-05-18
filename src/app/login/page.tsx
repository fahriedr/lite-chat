"use client"
import LoginCard from "@/components/Auth/LoginCard";
import Cookies from "js-cookie";
import {useRouter, useSearchParams} from 'next/navigation'
import React from "react";

export default function Login() {

  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const router = useRouter()
  React.useEffect(() => {
    const checkUser = async () => {
      const user = Cookies.get('user');
      if (user) {
        router.push("/home");
      }
    };

    checkUser();
  },[router])
  return (
    <>
      <main className="fixed-layout">
        <div className="app-container">
          <LoginCard error={error}/>
        </div>
      </main>
    </>
  );
}