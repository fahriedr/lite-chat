import Image from "next/image";
import React from "react";

interface Props {
  name?: String;
  lastText?: String;
  time?: String;
  onPress?: () => {};
}

const FriendPanel = ({ name, lastText, time, onPress }: Props) => {
  return (
    <>
      <div
        className="flex flex-row items-center py-[14px] cursor-pointer hover:bg-[#374151] px-2"
        onClick={onPress}
      >
        <div className="w-1/4">
          <Image
            className="border-solid border rounded-full stroke-black"
            width={40}
            height={40}
            src={"https://robohash.org/borju"}
            alt=""
          />
        </div>
        <div className="flex flex-col w-full">
          <span className="text-md font-bold">Jonathan</span>
          <span className="text-sm">Hello Jon</span>
        </div>
        <div className="w-1/4">
          <span className="text-xs">14.30</span>
        </div>
      </div>
      <hr className="flex-grow border-t border-gray-700"></hr>
    </>
  );
};

export default FriendPanel;
