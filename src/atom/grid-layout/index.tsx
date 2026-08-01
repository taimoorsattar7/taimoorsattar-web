import React from "react"

const GridLayout = ({ children }: any) => {
  return (
    <div className="flex flex-col space-y-2 max-w-2xl">
      {children}
    </div>
  )
}

export default GridLayout
