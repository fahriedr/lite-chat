"use client"

import React, { useCallback, useEffect, useState } from "react";
import ContactCard from "@/components/Home/ContactCard";
import { getConversationsApi, getMessagesApi } from "@/utils/api/messagesApi";
import { Message } from "@/types";
import { useMessageStore } from "@/store/messages";
import { useConversationStore } from "@/store/conversation";
import { checkAuth, logout } from "@/lib/helper";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user";
import Loading from "../UI/Loading";
import { NewChat } from "@/icons/NewChat";
import toast from "react-hot-toast";


const SidePanel = () => {

  const router = useRouter();

  const { resetUser } = useUserStore();
  const [conversationsLoading, setConversationsLoading] = useState<boolean>(true);

  const { messages, setMessage } = useMessageStore((state) => state);

  const {
    conversation,
    conversationAction,
    setSelectedConversation,
    conversationLoadingAction,
    resetConversation,
  } = useConversationStore((state) => state);

  const getConversations = useCallback(async () => {
    setConversationsLoading(true); // Ensure loading state is properly handled

    const user = await checkAuth()

    if(user) {
      const res = await getConversationsApi();

      if (res?.success === false) {
        router.push("/login");
        return;
      }
  
      conversationAction(res?.data.data);
      setConversationsLoading(false);
    } else {
      router.push("/login");
    }
  }, [router, conversationAction]);

  const panelOnClick = async (data: any) => {
    conversationLoadingAction();

    const dataConversation = {
      _id: data._id,
      name: data.participants[0].fullname,
      friendId: data.participants[0]._id,
      friendAvatar: data.participants[0].avatar,
    };

    setSelectedConversation(dataConversation);

    const res = await getMessagesApi(data.participants[0]._id);
    setMessage(res?.data.data);
    conversationLoadingAction();
  };

  const newChatOnClick = async () => {

  }

  const logoutClick = async () => {
    const res = await logout();
    if (res) {
      resetUser();
      resetConversation();
      router.push("/login");
    }
  };

  const lastText = (text: string): string => {
    return text.length > 45 ? text.substring(0, 45) + "..." : text;
  };

  useEffect(() => {
    getConversations();
  }, [getConversations]);

  return (
    <div className="flex flex-col h-full w-[568px] border-r-[1px] border-gray-700">

      {/* Header */}
      <div className="flex flex-row w-full justify-between py-4 px-2 items-center bg-[#202C33]">
        <span className="font-bold text-2xl">Chats</span>
        <div className="flex flex-row space-x-4 items-center">
          <div className="cursor-pointer rounded-full p-[4px] hover:bg-gray-500" onClick={() => toast.success("Hallo")}>
            <NewChat/>
          </div>
          <button onClick={logoutClick} className="bg-[#111B21] p-2 text-xs font-semibold rounded-md">Logout</button>
        </div>
      </div>

      {/* Search */}
      {/* <div className="flex flex-col w-full my-1 p-1">
        <input type="text" className="w-full px-2 py-2 text-sm rounded bg-[#202C33] outline-none" placeholder="Search or start new chat" />
      </div> */}

      {/* Contact */}
      <div className="flex flex-col overflow-auto">
        <div className="flex flex-col h-[45rem]">
          {
            conversationsLoading ?
              <div className="flex justify-center place-items-center w-full">
                <Loading />
              </div>
              :
              <>
                {
                  conversation.map((data, i) => {
                    return (
                      <ContactCard
                        key={i}
                        name={data.participants[0].fullname}
                        lastText={lastText(data.messages[0].message)}
                        time={data.messages[0].createdAt}
                        onPress={() => panelOnClick(data)}
                        avatar={data.participants[0].avatar as string}
                      />
                    );
                  })
                }
              </>
          }
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
