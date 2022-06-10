import React, { useCallback, useEffect, useRef, useState } from "react"

import Header from "@components/header"
import Footer from "@components/footer/footer"

const AnimateLayout = ({ children, location }: any) => {
  const myRef = useRef()

  const [scale, setScale] = useState(1)
  const [diffY, setDiffY] = useState("0")

  const callScale = useCallback(() => {
    const mainHeight = myRef.current.clientHeight
    const clientWidth = myRef.current.clientWidth
    setScale(-0.1 * (clientWidth / mainHeight) + 0.98)
  }, [])

  const callDiffY = useCallback(() => {
    setDiffY("-20px")
  }, [])

  const resetScale = useCallback(() => {
    setScale(1)
  }, [])

  const resetDiffY = useCallback(() => {
    setDiffY("0")
  }, [])

  useEffect(() => {
    window.onscroll = () => {
      const mainHeight = myRef.current?.clientHeight
      const clientWidth = myRef.current?.clientWidth

      if (clientWidth > mainHeight) {
        resetScale()
        resetDiffY()
      } else {
        if (window.innerHeight + window.pageYOffset > mainHeight) {
          callScale()
          callDiffY()
        } else {
          resetScale()
          resetDiffY()
        }
      }
    }
  }, [])

  return (
    <div style={{ background: "rgb(200 216 220)" }} className="main">
      <div
        ref={myRef}
        style={{
          background: "white",
          transform: `translateY(${diffY}) scale(${scale})`,
          transformOrigin: "center bottom 0px",
          transition: "all 0.5s ease 0s",
          boxShadow: "rgb(0 0 0 / 20%) 0px 12px 50px",
        }}
      >
        <Header location={location} />
        <main className="no-p">{children}</main>
      </div>

      <div
        style={{
          transform: `scale(${1 + (1 - scale)})`,
          transition: "all 0.5s ease 0s",
        }}
        className="wrapper wrapper--narrow"
      >
        <Footer />
      </div>
    </div>
  )
}

export default AnimateLayout
