import { useConversationStore } from "@/store/conversation";
import { useMessageStore } from "@/store/messages";
import { Message } from "@/types";
import { sendMessageApi } from "@/utils/api/messagesApi";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import VerticalDots from "./Icons/VerticalDots";

const ChatPanel = () => {

  const {messages, setMessage, addMessage} = useMessageStore((state) => state)
  const {conversation} = useConversationStore((state) => state )

  const [message, setMessageValue] = useState('');

  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = async (event: any) => {
    if (event.key === 'Enter') {

      const res = await sendMessageApi({
        data: {
          userId: conversation?.friendId!,
          message: message
        }
      })

      setMessageValue('')

      const _id = res?.data.data._id as string
      const newMessage = res?.data.data.message as string
      const receiverId = res?.data.data.receiverId as string
      const senderId = res?.data.data.senderId as string
      const createdAt = res?.data.data.createdAt as string

      const data: Message = {
        _id: _id,
        message: newMessage,
        receiverId: receiverId,
        senderId: senderId,
        createdAt: createdAt
      }

      console.log(res?.data, 'res');
      addMessage(data)
    }
  }


  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-full">
      {/* Header */}
      <div className="flex flex-row w-full px-4 items-center bg-[#202C33] h-[64px] py-[7px] justify-between">
        <div className="flex flex-row items-center">
          <Image
            className="border-solid border rounded-full stroke-black"
            width={50}
            height={50}
            src={conversation?.friendAvatar ?? 'https://robohash.org/random'}
            alt=""
          />
          <span className="pl-[20px] font-semibold text-lg">{conversation?.name}</span>
        </div>
        <div className="cursor-pointer">
          <VerticalDots color="white" size={6} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col flex-1 overflow-auto bg-[url('/images/wa-bg.svg')] px-[4px]">
        {
          messages.length > 0 ? 
          <>
            {
            messages.map((data, i) => {
                return (
                  <ChatBubble key={i} data={data}/>
                )
              })
            }
          </>
          : <></>
        }
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onChange={(e: any) => setMessageValue(e.target.value)} onKeyDown={sendMessage} value={message}/>
    </div>
  );
};

export default ChatPanel;
