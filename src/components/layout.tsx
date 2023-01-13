import React from "react"
import Header from "@components/header"
import Footer from "@components/footer/footer"

// import { Slice } from "gatsby"

const Layout = ({ children, location = {} }: any) => {
  return (
    <>
      <div className="main">
        {/* <Slice alias="header" location={location} /> */}
        <Header location={location} />

        <main className="no-p">{children}</main>
        <Footer />
        {/* <Slice alias="footer" /> */}
      </div>
    </>
  )
}

export default Layout
