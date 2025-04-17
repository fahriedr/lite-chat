"use client"

import React, { useEffect } from "react";
import ContactCard from "@/components/Home/ContactCard";
import {  getMessagesApi } from "@/utils/api/messagesApi";
import { useMessageStore } from "@/store/messages";
import { useConversationStore } from "@/store/conversation";
import { lastText, logout } from "@/lib/helper";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user";
import Loading from "../UI/Loading";
import { NewChat } from "@/icons/NewChat";
import { useSearchPanelStore } from "@/store/search-panel";
import Tooltip from "../UI/Tooltip";
import { FetchProps, swrFetcher } from "@/lib/useSwr-helper";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";

const SidePanel = () => {

  const router = useRouter();

  const { resetUser } = useUserStore();
  const { setMessage } = useMessageStore((state) => state);
  const { setSearchPanelStatus } = useSearchPanelStore((state) => state)

  const {
    conversation,
    conversationAction,
    setSelectedConversation,
    conversationLoadingAction,
    resetConversation,
  } = useConversationStore((state) => state);

  //Fetch Conversation
  const fetchProps: FetchProps = {
    url: '/api/conversations',
    method: 'get'
  };

  const { data: conversations, error, isLoading } = useSWR(
    [fetchProps.url, fetchProps.method],
    () => swrFetcher(fetchProps)
  );

  const panelOnClick = async (data: any) => {
    conversationLoadingAction(true);
    try {
      const dataConversation = {
        _id: data._id,
        name: data.participants.fullname,
        friendId: data.participants._id,
        friendAvatar: data.participants.avatar,
      };
      setSelectedConversation(dataConversation);
      const res = await getMessagesApi(data.participants._id);

      setMessage(res?.data.data)
      conversationLoadingAction(false);
    } catch (err) {
      console.error(err);
    } finally {
      conversationLoadingAction(false);
    }
  };

  const newChatOnClick = async () => {
    setSearchPanelStatus(true)
  }

  const logoutClick = async () => {
    const res = await logout();
    if (res) {
      resetUser();
      resetConversation();
      router.push("/login");
    }
  };

  useEffect(() => {
    if (error) {
      router.push('/error');
    }
  }, [error, router]);

  useEffect(() => {
    if (conversations) {
      conversationAction(conversations.data);
    }
  }, [conversations, conversationAction]);

  return (
    <div className="flex flex-col h-full w-[568px] border-r-[1px] border-gray-700">

      {/* Header */}
      <div className="flex flex-row w-full justify-between mb-2 py-4 px-2 items-center bg-[#202C33]">
        <span className="font-bold text-2xl">Chats</span>
        <div className="flex flex-row space-x-4 items-center">
          <Tooltip text="Start new chat">
            <div className="cursor-pointer rounded-full p-[4px] hover:bg-gray-500" onClick={newChatOnClick}>
              <NewChat />
            </div>
          </Tooltip>
          <button onClick={logoutClick} className="bg-[#111B21] p-2 text-xs font-semibold rounded-md">Logout</button>
        </div>
      </div>

      {/* Contact */}
      <div className="flex flex-col overflow-auto h-full">
        <div className="flex flex-col h-full">
          {
            isLoading ?
              <div className="flex justify-center place-items-center w-full h-full">
                <Loading />
              </div>
              :
              (
                <AnimatePresence>
                  {conversation.map((data, i) => (
                    <motion.div
                      key={data.participants._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      layout // This enables smooth position change when order updates
                    >
                      <ContactCard
                        id={data.participants._id}
                        name={data.participants.fullname}
                        lastText={lastText(data.messages[0]?.message || "")}
                        time={data.messages[0]?.createdAt}
                        onPress={() => panelOnClick(data)}
                        avatar={data.participants.avatar as string}
                        unreadMessage={data.unreadMessage}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              )
          }
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
