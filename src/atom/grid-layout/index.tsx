import React from "react"

const GridLayout = ({ children }: any) => {
  return (
    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200  lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {children}
    </div>
  )
}

export default GridLayout
