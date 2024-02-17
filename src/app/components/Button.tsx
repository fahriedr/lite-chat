'use client';
import React, { ButtonHTMLAttributes, ForwardRefRenderFunction } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  text: string,
}

const ButtonCustom: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = ({text, ...otherProps}, ref) => {
  return (
    <div>
        <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full`} {...otherProps} ref={ref}>
          {text}
        </button>
    </div>
  )
}

const Button = React.forwardRef(ButtonCustom);

export default Button