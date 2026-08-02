"use client"

import React, { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { CopyXIcon } from "lucide-react"

const Modal = (props: any) => {
  const [pop, setPop] = useState(false)
  const [mounted, setMounted] = useState(false)

  const closeOnEscapeKeyDown = (e: { charCode: any; keyCode: any }) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose()
    }
  }

  useEffect(() => {
    setMounted(true)
    const clrtime = setTimeout(() => {
      setPop(true)
    }, props.timer || 0)

    document.body.addEventListener("keydown", closeOnEscapeKeyDown)

    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown)
      clearTimeout(clrtime)
    }
  }, [props])

  useEffect(() => {
    if (props.show && pop) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [props.show, pop])

  if (!props.show || !pop || !mounted) {
    return null
  }

  const modalMarkup = (
    <div
      className="fixed inset-0 z-[9999] flex items-start sm:items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(evt: any) => {
          props.onClose(evt)
        }}
        className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md transition-opacity"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-xl my-4 sm:my-auto max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-zinc-900 text-left shadow-2xl transition-all border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="bg-zinc-100/90 dark:bg-zinc-800/80 px-6 py-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700/60 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
            <span id="modal-title" className="text-sm font-extrabold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
              {props.title || "Course Enrollment"}
            </span>
          </div>
          <button
            onClick={(evt: any) => {
              props.onClose(evt)
            }}
            className="p-1.5 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <CopyXIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-white dark:bg-zinc-900 text-left">
          {props.body && (
            <p
              className="prose prose-base dark:prose-invert mb-4 text-left"
              dangerouslySetInnerHTML={{
                __html: props.success ? props.successmsg : props.body,
              }}
            />
          )}

          <div className="modal__body text-left">{props.children}</div>
        </div>
      </div>
    </div>
  )

  return createPortal(modalMarkup, document.body)
}

export default Modal
