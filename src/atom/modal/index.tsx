"use client"

import React, { useState, useEffect } from "react"
import Button from "@atom/button/index"
// import AnimateProp from "@atom/animation-prop/index"

const Modal = (props: any) => {
  const [pop, setPop] = useState(false)

  const closeOnEscapeKeyDown = (e: { charCode: any; keyCode: any }) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose()
    }
  }

  useEffect(() => {
    const clrtime = setTimeout(() => {
      setPop(true)
    }, props.timer || 0)

    document.body.addEventListener("keydown", closeOnEscapeKeyDown)

    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown)
      clearTimeout(clrtime)
    }
  }, [])

  if (!props.show || !pop) {
    return <></>
  }

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  --> */}

      <div
        onClick={(evt: any) => {
          props.onClose(evt)
        }}
        className="fixed max-w-full max-h-screen inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-md"
      >
        .
      </div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          {/* <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      --> */}
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              {props.title && (
                <h4 className="text-x">
                  <b>{props.title}</b>
                </h4>
              )}

              <p
                className="prose prose-base"
                dangerouslySetInnerHTML={{
                  __html: props.success ? props.successmsg : props.body,
                }}
              ></p>

              <div className="modal__body">{props.children}</div>
            </div>
            <div className="bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <Button
                textValue="Close Modal"
                iconRight="copyx"
                btnSize="sml"
                btnTheme="outline"
                onClickHandler={(evt: any) => {
                  props.onClose(evt)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
