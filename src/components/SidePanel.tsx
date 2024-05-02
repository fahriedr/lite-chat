import Image from "next/image";
import React, { useEffect, useState } from "react";
import VerticalDots from "./Icons/VerticalDots";
import FormInput from "./TextInput";
import LogoutIcon from "./Icons/LogoutIcon";
import ContactCard from "./ContactCard";
import { getConversationsApi, getMessagesApi } from "@/utils/api/messagesApi";
import { Message } from "@/types";
import { useMessageStore } from "@/store/messages";
import { useConversationStore } from "@/store/conversation";
import { logout } from "@/lib/helper";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user";

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

  const router = useRouter()

  const {resetUser} = useUserStore()
  const [conversations, setConversations] = useState<Array<Conversation>>([]);
  const [message, setMessageValue] = useState<Array<Message>>([]);

  const {messages, setMessage} = useMessageStore((state) => state)

  const {conversation, conversationAction} = useConversationStore((state) => state)


  const getConversations = async () => {

    const res = await getConversationsApi()

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

    const res = await getMessagesApi(data.participants[0]._id)

    setMessage(res?.data.data)
  }

  const logoutClick = async () => {
    const res = await logout()
    if(res) {
      resetUser()
      router.refresh()
    }
  }

  useEffect(() => {
    getConversations()
  }, []);

  return (
    <div className="flex flex-col h-full w-[568px] border-r-[1px] border-gray-700">

      {/* Header */}
      <div className="flex flex-row w-full justify-between py-3 px-2 items-center bg-[#202C33]">
        <span className="font-bold text-2xl">Chats</span>
        <button onClick={logoutClick} className="bg-[#111B21] p-2 text-xs font-semibold rounded-md">Logout</button>
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
                lastText={data.messages[0].message.substring(0, 45) + ' ...'}
                time={data.messages[0].createdAt}
                onPress={() => panelOnClick(data)}
                avatar={data.participants[0].avatar as string}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
