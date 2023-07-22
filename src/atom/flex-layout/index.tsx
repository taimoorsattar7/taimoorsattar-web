import React from "react"

const FlexLayout = ({ children }: any) => {
  return (
    <div className="flex gap-2 flex-wrap justify-center sm:justify-between">
      {children}
    </div>
  )
}

export default FlexLayout
