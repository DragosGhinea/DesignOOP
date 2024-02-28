import React, { ReactNode } from 'react'

const Container = ({children} : {children: ReactNode}) => {
  return (
    <div>Container
        {children}
    </div>
  )
}

export default Container