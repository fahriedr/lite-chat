import Image from "next/image";
import React from "react";

interface Props {
  name?: String;
  lastText?: String;
  time?: String;
  avatar?: String;
  onPress?: (conversation: any) => void;
}

const ContactCard = ({ name, lastText, time, avatar, onPress }: Props) => {
  return (
    <>
      <div className="px-3 flex items-center bg-grey-light cursor-pointer hover:bg-[#202C33]" onClick={onPress}>
        <div>
          <Image
            className="border-solid border rounded-full stroke-black"
            width={48}
            height={48}
            src={avatar}
            alt=""
          />
        </div>
        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
          <div className="flex items-bottom justify-between">
            <p className="text-grey-darkest">{name}</p>
            <p className="text-xs text-grey-darkest">{time}</p>
          </div>
          <p className="text-gray-500 mt-1 text-sm">
            {lastText}
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactCard;
