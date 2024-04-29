'use client';
import React, { ButtonHTMLAttributes, ForwardRefRenderFunction } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  text: string,
  loading?: boolean
}

const ButtonCustom: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = ({text, loading, ...otherProps}, ref) => {
  return (
    <div>
        <button className={`flex flex-row bg-blue-500 justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full`} {...otherProps} ref={ref} disabled={loading ? true : false}>
          {
            loading ? 
            <div className="border-gray-300 h-6 w-6 animate-spin rounded-full border-4 border-t-blue-600" />
            :
            <p>
              {text}
            </p>
          }          
        </button>
    </div>
  )
}

const Button = React.forwardRef(ButtonCustom);

export default Button