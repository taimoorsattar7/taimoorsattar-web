import React from "react"

import { Slice } from "gatsby"

const Layout = ({ children, location = {} }: any) => {
  return (
    <>
      <div className="main">
        <Slice alias="header" location={location} />

        <main className="no-p">{children}</main>
        <Slice alias="footer" />
      </div>
    </>
  )
}

export default Layout
