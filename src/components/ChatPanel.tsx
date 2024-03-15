import Image from "next/image";
import React from "react";
import ChatBubble from "./ChatBubble";
import VerticalDots from "./Icons/VerticalDots";

const ChatPanel = () => {
  return (
    <div className="flex flex-col w-full h-full bg-[url('/images/wa-bg.svg')]">
      <div className="flex flex-row w-full justify-between px-4 items-center bg-[#374151] h-[64px]">
        <Image
          className="border-solid border rounded-full stroke-black"
          width={50}
          height={50}
          src={"https://robohash.org/borju"}
          alt=""
        />
        <div className="cursor-pointer">
          <VerticalDots color="white" size={6} />
        </div>
      </div>
      <div className="overflow-y-scroll">
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <div className="w-fit h-fit bg-[#202D34] ml-[16px] py-2 px-4 my-[2px] rounded-tr-lg rounded-br-lg rounded-bl-lg">
            Horay
        </div>
      </div>
      <div className='flex bg-[teal] h-[80px]'>
        hai
      </div>
    </div>
  );
};

export default ChatPanel;
