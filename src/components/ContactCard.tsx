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

    if(now === paramDate) {
        return moment(date).format('HH:mm')
    } else {
        return moment(date).format('DD/MM/YY') 
    }
  }

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
            <p className="text-xs text-grey-darkest">{lastMessageTime(time)}</p>
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
