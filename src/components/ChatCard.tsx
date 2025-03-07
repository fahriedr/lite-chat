'use client';
import { useConversationStore } from '@/store/conversation';
import React, { useEffect, useState } from 'react'
import ChatPanel from './ChatPanel';
import EmptyChatPanel from './EmptyChatPanel';
import SidePanel from './SidePanel';
import io from 'socket.io-client'
import { useMessageStore } from '@/store/messages';
import Cookies from 'js-cookie';
import Loading from './Loading';

const ChatCard = () => {

  const { conversation, loading } = useConversationStore(state => state);
  const { addMessage } = useMessageStore(state => state);
  const user = Cookies.get('user');
  const userId = JSON.parse(user ?? '{}')._id;

  useEffect(() => {
    const socket = io('http://localhost:3002', { withCredentials: true });

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
      <div className='flex flex-col justify-center items-center w-full'>
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