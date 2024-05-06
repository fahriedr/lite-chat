'use client';
import { useConversationStore } from '@/store/conversation';
import React, { useEffect, useState } from 'react'
import ChatPanel from './ChatPanel';
import EmptyChatPanel from './EmptyChatPanel';
import SidePanel from './SidePanel';
import io from 'socket.io-client'
import { useMessageStore } from '@/store/messages';
import Cookies from 'js-cookie';

const ChatCard = () => {

  const {conversation} = useConversationStore((state) => state )

  const {addMessage} = useMessageStore((state) => state)

  const user = Cookies.get('user')
  const userId = JSON.parse(user!)._id

  useEffect(() => {
    
    const socket = io('http://localhost:3002', {
      withCredentials: true,
    })

    socket.on('message', (message) => {
      if(message.receiverId === userId) {
        addMessage(message)
      }
    })

    return () => {
      socket.disconnect();
    };
  }, []);

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