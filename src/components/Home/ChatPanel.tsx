"use client"

import { useConversationStore } from "@/store/conversation";
import { useMessageStore } from "@/store/messages";
import { Message } from "@/types";
import { sendMessageApi, updateMessageStatusApi } from "@/utils/api/messagesApi";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ChatBubble from "@/components/UI/ChatBubble";
import ChatInput from "@/components/UI/ChatInput";
import { sendMessage } from "@/store/actions/message.actions";
import { socket } from "@/lib/socket-io";
import { useUserStore } from "@/store/user";
import Loading from "../UI/Loading";

const ChatPanel = () => {

  const { user } = useUserStore((state) => state);
  const { messages, setMessage, addMessage } = useMessageStore((state) => state);
  const { conversation, selectedConversation, loading, messageUpdate, updateUnreadMessage } = useConversationStore((state) => state);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onSendMessage = async (message: string) => {
    const res = await sendMessageApi({
      data: {
        userId: selectedConversation?.friendId!,
        message: message,
      },
    });

    const newMessage = res?.data.data;
    if (newMessage) {
      addMessage(newMessage);
      sendMessage(newMessage);
      messageUpdate(newMessage);
      setTimeout(scrollToBottom, 100); // Ensure scrolling after state updates
    }
  };

  const onSeen = async (id: string) => {
    const res = await updateMessageStatusApi(id);

    updateUnreadMessage()
  };
  

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-screen">
      {/* Header */}
      <div className="flex flex-row w-full px-4 items-center bg-[#202C33] h-[72px] py-[7px] justify-between">
        <div className="flex flex-row items-center">
          <Image
            className="border-solid border rounded-full stroke-black"
            width={50}
            height={50}
            src={selectedConversation?.friendAvatar ?? "https://robohash.org/random"}
            alt=""
          />
          <span className="pl-[20px] font-semibold text-lg">
            {selectedConversation?.name}
          </span>
        </div>
      </div>

      {/* Messages */}
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col flex-1 overflow-y-auto bg-[url('/images/wa-bg.svg')] px-8">
          {messages.map((data, i) => (
            <ChatBubble
              key={i}
              id={data._id}
              createdAt={data.createdAt}
              message={data.message}
              isSender={user?._id === data.senderId}
              onSeen={onSeen}
              isRead={data.isRead ?? false}
            />
          ))}
          {/* Auto-scroll target */}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input */}
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};


export default ChatPanel;
