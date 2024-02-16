import React from 'react'

const Container: React.FC<{children: React.ReactNode}>= ({children}) => {
  return (
    <div 
        className={`w-100 my-[12px]`}>
        {children}
    </div>
  )
}

export default Container