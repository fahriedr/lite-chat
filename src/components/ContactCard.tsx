import Image from "next/image";
import React from "react";

interface Props {
  name?: String;
  lastText?: String;
  time?: String;
  onPress?: () => {};
}

const ContactCard = ({ name, lastText, time, onPress }: Props) => {
  return (
    <>
      <div className="px-3 flex items-center bg-grey-light cursor-pointer hover:bg-[#202C33]">
        <div>
          <Image
            className="border-solid border rounded-full stroke-black"
            width={48}
            height={48}
            src={"https://robohash.org/borju"}
            alt=""
          />
        </div>
        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
          <div className="flex items-bottom justify-between">
            <p className="text-grey-darkest">{name}</p>
            <p className="text-xs text-grey-darkest">12:45 pm</p>
          </div>
          <p className="text-gray-500 mt-1 text-sm">
            Get Andrés on this movie ASAP!
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactCard;
