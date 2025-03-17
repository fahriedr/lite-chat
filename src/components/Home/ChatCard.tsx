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
import { pusherClient } from '@/lib/pusher-helper';
import { Message } from '@/types';

const ChatCard = () => {

  const { conversation, loading, selectedConversation} = useConversationStore(state => state);
  const { addMessage } = useMessageStore(state => state);
  const user = Cookies.get('user');
  const userId = JSON.parse(user ?? '{}')._id;

  useEffect(() => {
    pusherClient.subscribe('lite-chat');

    const handleMessage = (message: Message) => {
        if (message.receiverId === userId) {
            addMessage(message);
        }
    };

    pusherClient.bind('upcoming-message', handleMessage);

    return () => {
        pusherClient.unbind('upcoming-message', handleMessage);
        pusherClient.unsubscribe('lite-chat');
    };
});


  const renderChatPanel = () => {
    if (!selectedConversation) return <EmptyChatPanel />;
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