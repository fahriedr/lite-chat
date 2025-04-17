import moment from "moment";
import React, { useEffect, useRef } from "react";

type Props  = {
  id: string
  message: string
  createdAt: string
  isSender: boolean
  onSeen: (id: string) => void
  isRead: boolean
}

const ChatBubble = ({id, message, createdAt, isSender, onSeen, isRead}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && (!isSender)) {
        if(!isRead) {
          onSeen(id);
        }
      }
    });

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);
  return (
    <div ref={ref} className={`flex ${isSender ? "justify-end" : "justify-start"} my-[1px]`}>
      <div
        className={`flex flex-row w-fit max-w-[60%] px-[6px] py-[6px] min-w-[80px] rounded-lg shadow-md ${
          isSender
            ? "bg-[#075E54] text-white rounded-tl-lg rounded-bl-lg rounded-br-lg"
            : "bg-[#202D34] text-white rounded-tr-lg rounded-br-lg rounded-bl-lg"
        }`}
      >
        <p className="break-words text-[15px] px-1">{message}</p>
        <p className="text-[11px] text-[#8696A0] self-end mt-1">
          {moment(createdAt).format("HH:mm")}
        </p>
      </div>
    </div>
  );
};

export default ChatBubble;