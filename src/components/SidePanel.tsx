import Image from "next/image";
import React, { useEffect, useState } from "react";
import VerticalDots from "./Icons/VerticalDots";
import FormInput from "./TextInput";
import LogoutIcon from "./Icons/LogoutIcon";
import ContactCard from "./ContactCard";
import { conversationsApi, messagesApi } from "@/utils/api/messagesApi";
import { Message } from "@/types";
import { useMessageStore } from "@/store/messages";
import { useConversationStore } from "@/store/conversation";

interface Participant {
  _id: String,
  avatar: String,
  createdAt: String,
  email: String,
  fullname: String,
  updatedAt: String,
  username: String
}


interface Conversation {
  _id: String,
  createdAt: String,
  updatedAt: String,
  participants: Array<Participant>,
  messages: Array<Message>,

}

const SidePanel = () => {


  const [conversations, setConversations] = useState<Array<Conversation>>([]);
  const [message, setMessage] = useState<Array<Message>>([]);

  const {messages, messageAction} = useMessageStore((state) => state)

  const {conversation, conversationAction} = useConversationStore((state) => state)


  const getConversations = async () => {

    const res = await conversationsApi()

    setConversations(res?.data.data)

  }

  const panelOnClick = async (data: any) => {

    const dataConversation = {
      _id: data._id,
      name: data.participants[0].fullname,
      friendId: data.participants[0]._id,
      friendAvatar: data.participants[0].avatar
    }

    conversationAction(dataConversation)

    const res = await messagesApi(data.participants[0]._id)

    messageAction(res?.data.data)
  }

  useEffect(() => {
    getConversations()
  }, []);

  return (
    <div className="flex flex-col h-full w-[568px] border-r-[1px] border-gray-700">

      {/* Header */}
      <div className="flex flex-row w-full justify-between py-3 px-2 items-center bg-[#202C33]">
        <Image
          className="border-solid border rounded-full stroke-black"
          width={40}
          height={40}
          src={"https://robohash.org/borju"}
          alt=""
        />
        <div className="cursor-pointer">
          <button
            id="dropdownMenuIconButton"
            data-dropdown-toggle="dropdownDots"
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-[#202C33] dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
          >
            <VerticalDots/>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col w-full my-1 p-1">
        <input type="text" className="w-full px-2 py-2 text-sm rounded bg-[#202C33]" placeholder="Search or start new chat"/>
      </div>

      {/* Contact */}
      <div className="flex flex-col overflow-auto">
        <div className="flex flex-col h-[45rem]">
          {conversations.map((data, i) => {
            return (
              <ContactCard 
                key={i}
                name={data.participants[0].fullname} 
                lastText={data.messages[0].message}
                time={data.messages[0].createdAt}
                onPress={() => panelOnClick(data)}
                avatar={data.participants[0].avatar}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
