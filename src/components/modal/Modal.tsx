import React, { useState, useEffect } from "react"
import "./_modal.scss"

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
    <div className="modal z-40" onClick={e => alert("Hi")}>
      <div
        className="modal__content radius3 m-r-15 m-l-15 "
        onClick={e => e.stopPropagation()}
      >
        <div onClick={props.onClose} className="modal__close-x"></div>

        {props.title && (
          <h4 className="headline headline__medium">
            <b>{props.title}</b>
          </h4>
        )}

        {props.success ? (
          <p
            className="headline headline__text
                         headline--inblock headline--b-margin-medium"
            dangerouslySetInnerHTML={{ __html: props.successmsg }}
          ></p>
        ) : (
          <p
            className="headline headline__text
                         headline--inblock headline--b-margin-medium"
            dangerouslySetInnerHTML={{ __html: props.body }}
          ></p>
        )}

        <div className="modal__body">{props.children}</div>
      </div>
    </div>
  )
}

export default Modal
