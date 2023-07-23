import React from "react"
import { PageProps, Link, graphql } from "gatsby"

// import BlogList from "@components/blog-list/index"

const SubstackEmbed: React.FC<PageProps<any>> = ({ className }: any) => {
  return (
    <iframe
      className={`${className}`}
      src="https://taimoor.substack.com/embed"
      width="480"
      height="320"
      style={{ border: "1px solid #EEE", background: "white" }}
      frameBorder="0"
      scrolling="no"
    ></iframe>
  )
}

export default SubstackEmbed
