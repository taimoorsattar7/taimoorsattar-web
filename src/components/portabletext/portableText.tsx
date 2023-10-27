"use client"
import React from "react"
import { PortableText } from "@portabletext/react"
import serializers from "./serializers"

const PortableTextReact = (props: { blocks: any; className?: any }) => {
  return (
    <div className={props?.className ? props?.className : ""}>
      <PortableText
        value={props?.blocks ? props?.blocks : []}
        components={serializers}
      />
    </div>
  )
}

export default PortableTextReact
