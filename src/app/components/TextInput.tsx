import React from 'react'


interface Props {
    type: 'text' | 'password' | 'email',
    id?: string,
    label?: string | null,
    placeholder?: string,
    isRequired?: boolean
}

const TextInput = (props: Props) => {
  return (
    <div>
        {props.label ? 
        <>
          <label className={`font-bold mb-4`}>{props.label}</label>
          </> : 
          <></>
        }
        <input 
          type={`${props.type}`} 
          id={`${props.id ?? ''}`} 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder={`${props.placeholder ?? ''}`}
          required={props.isRequired ?? false}
        />
    </div>
  )
}

export default TextInput