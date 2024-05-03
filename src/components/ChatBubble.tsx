import Cookies from "js-cookie";
import moment from "moment";
import React from "react";

const ChatBubble = (data: any) => {
  const id = JSON.parse(Cookies.get('user')!)._id

  return (
    <>
      {data.data.senderId === id ?
        <div className="flex justify-end">
          <div className="flex flex-col w-fit h-fit bg-[#075E54] ml-[2px] py-[6px] px-2 my-[1px] rounded-tl-lg rounded-bl-lg rounded-br-lg max-w-[60%] min-w-[80px]">
            <p>
              {data.data.message}
            </p>
            <p className="text-xs/[1px] mt-2 self-end text-[#8696A0]">{moment(data.data.createdAt).format('HH:mm')}</p>
          </div>
        </div>
        :
        <div className="flex">
          <div className="flex flex-col w-fit h-fit bg-[#202D34] ml-[2px] py-[6px] px-2 my-[2px] rounded-tr-lg rounded-br-lg rounded-bl-lg max-w-[60%] min-w-[80px]">
            <p>
              {data.data.message}
            </p>
            <p className="text-xs/[1px] mt-2 self-end text-[#8696A0]">{moment(data.data.createdAt).format('HH:mm')}</p>
          </div>
        </div>
      }
    </>
  );
};

export default ChatBubble;
