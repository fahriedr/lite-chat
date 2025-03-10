'use client';
import { useConversationStore } from '@/store/conversation';
import React, { useEffect, useState } from 'react'
import ChatPanel from '@/components/Home/ChatPanel';
import EmptyChatPanel from '@/components/Home/EmptyChatPanel';
import SidePanel from '@/components/Home/SidePanel';
import io from 'socket.io-client'
import { useMessageStore } from '@/store/messages';
import Cookies from 'js-cookie';
import Loading from '@/components/UI/Loading';

const ChatCard = () => {

  const { conversation, loading } = useConversationStore(state => state);
  const { addMessage } = useMessageStore(state => state);
  const user = Cookies.get('user');
  const userId = JSON.parse(user ?? '{}')._id;

  useEffect(() => {
    const socket = io('http://socket.fahriedev.web.id/', { withCredentials: true });

    socket.on('message', message => {
      if (message.receiverId === userId) {
        addMessage(message);
      }
    });

    return () => {socket.disconnect()};
  }, [addMessage, userId]);

  const renderChatPanel = () => {
    if (!conversation) return <EmptyChatPanel />;
    if (loading) return (
      <div className='flex flex-col justify-center items-center w-full h-full'>
        <Loading />
      </div>
    );
    return <ChatPanel />;
  };

  return (
    <div className='flex bg-[#111B21] w-full h-full'>
      <SidePanel />
      {renderChatPanel()}
    </div>
  );
}

export default ChatCard