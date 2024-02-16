import React from 'react'

interface Props {
    text: string,
}

const Button = (props: Props) => {
  return (
    <div>
        <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full`}>
            {props.text}
        </button>
    </div>
  )
}

export default Button