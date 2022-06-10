import React from "react"
import Header from "@components/header"
import Footer from "@components/footer/footer"

const Layout = ({ children, location = {} }: any) => {
  return (
    <>
      <div className="main">
        <Header location={location} />
        <main className="no-p">{children}</main>

        <Footer />
      </div>
    </>
  )
}

export default Layout
