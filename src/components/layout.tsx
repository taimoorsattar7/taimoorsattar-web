import React from "react"
import Header from "@components/header"
import Footer from "@components/footer/footer"
// import Banner from "@components/Banner"
import { Container } from "@components/Container"
// import { Slice } from "gatsby"

const Layout = ({
  children,
  noMargin,
  noFooter = false,
  location = {},
}: any) => {
  // let pathname = String(location?.pathname)
  return (
    <div className="main">
      {/* {pathname?.includes("/blog") ? <Banner /> : <></>} */}

      <Header location={location} />
      {noMargin == true ? (
        <main>{children}</main>
      ) : (
        <Container className={noMargin == true ? "m-0" : `mt-12 sm:mt-16`}>
          <main>{children}</main>
        </Container>
      )}

      {noFooter == false ? <Footer /> : <></>}
    </div>
  )
}

export default Layout
