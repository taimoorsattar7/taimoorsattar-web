"use client"

import React, { useState, useEffect } from "react"

import { CopyXIcon } from "lucide-react"

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(evt: any) => {
          props.onClose(evt)
        }}
        className="fixed inset-0 bg-zinc-900/70 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-lg my-auto transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 text-left shadow-2xl transition-all border border-zinc-200 dark:border-zinc-800">
        <div className="bg-zinc-100 dark:bg-zinc-800/80 px-4 py-3 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700/60">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {props.title || "Course Enrollment"}
          </span>
          <CopyXIcon
            onClick={(evt: any) => {
              props.onClose(evt)
            }}
            className="w-5 h-5 cursor-pointer text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          />
        </div>
        <div className="bg-white dark:bg-zinc-900 p-4 sm:p-6">
          {props.body && (
            <p
              className="prose prose-base dark:prose-invert mb-4"
              dangerouslySetInnerHTML={{
                __html: props.success ? props.successmsg : props.body,
              }}
            />
          )}

          <div className="modal__body">{props.children}</div>
        </div>
      </div>
    </div>
  )
}

export default Modal
