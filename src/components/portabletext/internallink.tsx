import React from "react"
import { Link } from "gatsby"

export const InternalLink = (props: any) => {
  return (
    <>
      <Link
        className="block cursor-pointer pt-3 pb-3 pl-4 pr-4 border-2 border-gray-700"
        to={props?.value?.content?.slug?.current}
      >
        {props?.value?.content?.title}
      </Link>
    </>
  )
}
