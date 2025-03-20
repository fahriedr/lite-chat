import Image from 'next/image'
import React from 'react'

type Props = {
    name: string
    image: string
    status?: string
}

const UserCard = ({ name, image, status }: Props) => {
  return (
    <div className='flex flex-row space-x-2 cursor-pointer hover:bg-[#202C33] py-2 rounded-sm'>
        <div className='flex'>
            <Image
                className="border-solid border rounded-full stroke-black"
                width={50}
                height={50}
                src={image}
                alt=""
            />
        </div>
        <div className='flex flex-col'>
            <span>{name}</span>
            <span>Some Status</span>
        </div>
    </div>
  )
}

export default UserCard