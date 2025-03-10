import { useConversationStore } from "@/store/conversation";
import { useMessageStore } from "@/store/messages";
import { Message } from "@/types";
import { sendMessageApi } from "@/utils/api/messagesApi";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ChatBubble from "@/components/UI/ChatBubble";
import ChatInput from "@/components/UI/ChatInput";
import VerticalDots from "../Icons/VerticalDots";
import io from "socket.io-client";
import Pusher from "pusher-js";

const ChatPanel = () => {
  Pusher.logToConsole = true;

  // const pusher = new Pusher("993f5fb44f2246f24dd7", {
  //   cluster: "ap1",
  // });

  // const channel = pusher.subscribe("my-channel");

  const socket = io('http://localhost:3002', {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd"
    }
  })

  const { messages, setMessage, addMessage } = useMessageStore(
    (state) => state
  );
  const { conversation } = useConversationStore((state) => state);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSendMessage = async (message: string) => {
    const res = await sendMessageApi({
      data: {
        userId: conversation?.friendId!,
        message: message,
      },
    });

    const _id = res?.data.data._id as string;
    const newMessage = res?.data.data.message as string;
    const receiverId = res?.data.data.receiverId as string;
    const senderId = res?.data.data.senderId as string;
    const createdAt = res?.data.data.createdAt as string;

    const data: Message = {
      _id: _id,
      message: newMessage,
      receiverId: receiverId,
      senderId: senderId,
      createdAt: createdAt,
    };
    addMessage(data);
    socket.emit('message', data)
  };

  console.log(messages, 'mess')

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-screen">
      {/* Header */}
      <div className="flex flex-row w-full px-4 items-center bg-[#202C33] h-[64px] py-[7px] justify-between">
        <div className="flex flex-row items-center">
          <Image
            className="border-solid border rounded-full stroke-black"
            width={50}
            height={50}
            src={conversation?.friendAvatar ?? "https://robohash.org/random"}
            alt=""
          />
          <span className="pl-[20px] font-semibold text-lg">
            {conversation?.name}
          </span>
        </div>
        <div className="cursor-pointer">
          <VerticalDots color="white" size={6} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col flex-1 overflow-auto bg-[url('/images/wa-bg.svg')] px-8">
        {messages.length > 0 ? (
          <>
            {messages.map((data, i) => {
              return <ChatBubble key={i} data={data} />;
            })}
          </>
        ) : (
          <></>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput
        onSendMessage={onSendMessage}
      />
    </div>
  );
};

export default ChatPanel;
