"use client"

import React from "react"

const SubstackEmbed = ({ className, ...props }: any) => {
  return (
    <iframe
      {...props}
      className={`${className}`}
      src="https://taimoor.substack.com/embed"
      width="480"
      height="320"
      style={{ border: "1px solid #EEE", background: "white" }}
    ></iframe>
  )
}

export default SubstackEmbed
