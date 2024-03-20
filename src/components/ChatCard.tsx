'use client';
import React from 'react'
import ChatPanel from './ChatPanel';
import SidePanel from './SidePanel';

const ChatCard = () => {
  return (
    <div className='flex bg-[#111B21] w-full h-full'>
      <SidePanel/>
      <ChatPanel/>
    </div>
  )
}

export default ChatCard