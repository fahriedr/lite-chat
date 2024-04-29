import Cookies from "js-cookie";
import React from "react";

const ChatBubble = (data: any) => {
  const id = JSON.parse(Cookies.get('user')!)._id

  return (
    <>
      {data.data.senderId === id ?
      <div className="flex justify-end">
        <div className="w-fit h-fit bg-[#202D34] ml-[2px] py-2 px-4 my-[2px] rounded-tl-lg rounded-bl-lg rounded-br-lg max-w-[60%]">
          <p>
            {data.data.message}
          </p>
        </div>
      </div>
      :
      <div className="flex">
        <div className="w-fit h-fit bg-[#202D34] ml-[2px] py-2 px-4 my-[2px] rounded-tr-lg rounded-br-lg rounded-bl-lg max-w-[60%]">
          <p>
            {data.data.message}
          </p>
        </div>
      </div>
      }
    </>
  );
};

export default ChatBubble;
