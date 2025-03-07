"use client"
import LoginCard from "@/components/Auth/LoginCard";

export default function Login() {
  return (
    <>
      <main className="fixed-layout">
        <div className="app-container">
          <LoginCard/> 
        </div>
      </main>
    </>
  );
}