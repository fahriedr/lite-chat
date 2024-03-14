import Image from "next/image";
import React from "react";
import VerticalDots from "./Icons/VerticalDots";
import FormInput from "./TextInput";

const SidePanel = () => {
  return (
    <div className="flex flex-col w-[22rem]">
      <div className="flex flex-row w-fullpy-2 justify-between py-3 px-2 items-center bg-[#374151]">
          <Image className="border-solid border rounded-full stroke-black" width={40} height={40} src={'https://robohash.org/borju'} alt=""/>
          <div className="cursor-pointer riple">
            <VerticalDots color="white" size={6}/>
          </div>
      </div>
      <div className="flex flex-col mt-4 px-2">
        <div className="mb-4">
            <FormInput name="search" placeholder="Search"/>
        </div>
        <div className="flex flex-col">
            <div className="flex flex-row items-center h-[4rem] cursor-pointer hover:bg-[#0C1317]">
                <div className="w-1/4">
                    <Image className="border-solid border rounded-full stroke-black" width={40} height={40} src={'https://robohash.org/borju'} alt=""/>
                </div>
                <div className="flex flex-col w-full">
                    <span className="text-md font-bold">Jonathan</span>
                    <span className="text-sm">Hello Jon</span>
                </div>
                <div className="w-1/4">
                    <span className="text-xs">14.30</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
