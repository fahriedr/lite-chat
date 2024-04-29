import { useConversationStore } from "@/store/conversation";
import { useMessageStore } from "@/store/messages";
import { sendMessageApi } from "@/utils/api/messagesApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import VerticalDots from "./Icons/VerticalDots";

const ChatPanel = () => {

  const {messages} = useMessageStore((state) => state)
  const {conversation} = useConversationStore((state) => state )

  const [message, setMessage] = useState('');

  const sendMessage = async (event: any) => {
    if (event.key === 'Enter') {

      const res = await sendMessageApi({
        data: {
          userId: conversation?.friendId!,
          message: message
        }
      })

      setMessage('')

      console.log(res?.data, 'res');
      messages.push({
        _id: res?.data.data._id,
        message: res?.data.data.message,
        receiverId: res?.data.data.receiverId,
        senderId: res?.data.data.senderId,
        createdAt: res?.data.data.createdAt
      })
    }
  }


  useEffect(() => {
    
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
      <div className="flex flex-col flex-1 justify-end overflow-auto bg-[url('/images/wa-bg.svg')] px-[4px]">
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
      </div>

      {/* Input */}
      <ChatInput onChange={(e) => setMessage(e.target.value)} onKeyDown={sendMessage} value={message}/>
    </div>
  );
};

export default ChatPanel;
