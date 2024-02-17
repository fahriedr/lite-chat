import React, { ForwardRefRenderFunction, ReactNode } from 'react'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode,
}

const Container: ForwardRefRenderFunction<HTMLDivElement, ContainerProps>= ({children, ...otherProps}) => {
  return (
    <div 
        className={`w-100 my-[8px]`}>
        {children}
    </div>
  )
}

export default Container