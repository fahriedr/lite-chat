'use client';
import React from 'react'
import SidePanel from './SidePanel';

const ChatCard = () => {
  return (
    <div className='flex flex-row bg-[#202C33] w-full h-full'>
      <SidePanel/>
      <div className='flex w-2/3'>
        Main bar
      </div>
    </div>
  )
}

export default ChatCard