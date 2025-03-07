'use client';
import React, { ForwardRefRenderFunction, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  ref?: string;
}

const TextInput: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({name, label, ...otherProps}, ref) => {
  return (
    <div>
        {label ? 
        <>
          <label className={`font-bold mb-4`}>{label}</label>
          </> : 
          <></>
        }
        <input
          className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "}
          name={name}
          ref={ref}
          {...otherProps}
        />
    </div>
  )
}

const FormInput = React.forwardRef(TextInput);

export default FormInput