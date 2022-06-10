import React, { useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"

import WarningIcon from "@components/icons/warning/WarningIcon"

const Fail = () => {
  useEffect(() => {
    toast.error("Payment failed")
  }, [])

  return (
    <>
      <Toaster position="top-center" />
      <div className="m-b-15 m-auto flex flex--items-center flex--justify-center h40 w40 circle bg-light-red">
        <WarningIcon />
      </div>

      <div>
        <h3 className="headline text-center m-b-15">Payment Failed</h3>
        <p className="headline headline__text text-center m-b-15">
          Thanks for subscribing to the course. Click the below link to go to
          the course.
        </p>
      </div>
    </>
  )
}

export default Fail
