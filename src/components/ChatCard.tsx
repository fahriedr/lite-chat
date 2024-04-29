'use client';
import { useConversationStore } from '@/store/conversation';
import React from 'react'
import ChatPanel from './ChatPanel';
import EmptyChatPanel from './EmptyChatPanel';
import SidePanel from './SidePanel';

const ChatCard = () => {

  const {conversation} = useConversationStore((state) => state )

  return (
    <div className='flex bg-[#111B21] w-full h-full'>
      <SidePanel/>

      { !conversation
        ? 
        <EmptyChatPanel/>
        :
        <ChatPanel/>        
      }
    </div>
  )
}

export default ChatCard