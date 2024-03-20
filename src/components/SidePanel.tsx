import Image from "next/image";
import React from "react";
import VerticalDots from "./Icons/VerticalDots";
import FormInput from "./TextInput";
import LogoutIcon from "./Icons/LogoutIcon";
import ContactCard from "./ContactCard";

const SidePanel = () => {

  const data = [{
    id: 1,
    name: 'Sarah'
  },
  {
    id: 3,
    name: 'Foden'
  },
  {
    id: 4,
    name: 'Messi'
  },
  {
    id: 5,
    name: 'Peter'
  },
  {
    id: 6,
    name: 'Rina'
  },
  {
    id: 7,
    name: 'Michele'
  }];

  const getIndex = () => {};

  return (
    <div className="flex flex-col h-full w-[568px] border-r-[1px] border-gray-700">

      {/* Header */}
      <div className="flex flex-row w-full justify-between py-3 px-2 items-center bg-[#202C33]">
        <Image
          className="border-solid border rounded-full stroke-black"
          width={40}
          height={40}
          src={"https://robohash.org/borju"}
          alt=""
        />
        <div className="cursor-pointer">
          <button
            id="dropdownMenuIconButton"
            data-dropdown-toggle="dropdownDots"
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-[#202C33] dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
          >
            <VerticalDots/>
          </button>
          {/* <!-- Dropdown menu --> */}
          <div
            id="dropdownDots"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownMenuIconButton"
            >
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
            </ul>
            <div className="py-2">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Separated link
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col w-full my-1 p-1">
        <input type="text" className="w-full px-2 py-2 text-sm rounded bg-[#202C33]" placeholder="Search or start new chat"/>
      </div>

      {/* Contact */}
      <div className="flex flex-col overflow-auto">
        <div className="flex flex-col h-[45rem]">
          {data.map((data, i) => {
            return (
              <>
                <ContactCard key={i} name={data.name} />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
