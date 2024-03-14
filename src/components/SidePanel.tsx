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
        <FormInput name="search" placeholder="Search"/>
          body
      </div>

    </div>
  );
};

export default SidePanel;
