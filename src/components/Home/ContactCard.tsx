import moment from "moment";
import Image from "next/image";
import React from "react";

interface Props {
  name?: string;
  lastText?: string;
  time?: string;
  avatar?: string;
  onPress?: (conversation: any) => void;
}

const ContactCard = ({ name, lastText, time, avatar = 'https://robohash/random', onPress }: Props) => {


  const lastMessageTime = (date: any) => {
    const paramDate = moment(date).format('DD/MM/YY')

    const now = moment().format('DD/MM/YY')

    if (now === paramDate) {
      return moment(date).format('HH:mm')
    } else {
      return moment(date).format('DD/MM/YY')
    }
  }

  return (
    <>
      <div
        className="px-4 py-3 flex items-center cursor-pointer hover:bg-[#202C33] transition duration-200"
        onClick={onPress}
      >
        {/* Avatar */}
        <div>
          <Image
            className="border-solid border border-gray-600 rounded-full"
            width={50}
            height={50}
            src={avatar}
            alt=""
          />
        </div>

        {/* Message Content */}
        <div className="ml-4 flex-1 border-b border-gray-700 py-2">
          <div className="flex justify-between items-center">
            <p className="text-white font-medium">{name}</p>
            <p className="text-xs text-gray-400">{lastMessageTime(time)}</p>
          </div>
          <p className="text-gray-400 mt-1 text-sm truncate">{lastText}</p>
        </div>
      </div>

    </>
  );
};

export default ContactCard;
