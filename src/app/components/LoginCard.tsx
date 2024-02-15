import React from 'react'
import Card from './Card'
import TextInput from './TextInput'

const LoginCard = () => {
  return (
    <div className={`flex flex-col justify-items-center items-center my-20 w-[40vw] bg-[#202C33] rounded-md p-6`}>
      <span>Login</span>
      <TextInput type='text' placeholder='Username'/>
    </div>
  )
}

export default LoginCard