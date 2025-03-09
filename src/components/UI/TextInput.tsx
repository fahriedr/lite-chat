'use client';
import React, { ForwardRefRenderFunction, InputHTMLAttributes } from 'react'
import { ZodError } from 'zod';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  ref?: string
  value: string
  type: 'email' | 'text' | 'password'
  placeholder: string
  onChange: (e: any) => void
  error?: any
}

function Errors(props: {errors?: string[]}){
  if(!props.errors?.length) return null;
  return <div><span className="text-red-500">{props.errors.map(err => <p>{err}</p>)}</span></div>
}

const TextInput: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({id, label, placeholder, onChange, value, type, error, ...otherProps }, ref) => {
  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        className="w-full px-4 py-3 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {onChange(e.target.value)}}
      />
      <Errors errors={error?.id?._errors} />
      
    </div>
  )
}

const FormInput = React.forwardRef(TextInput);

export default FormInput