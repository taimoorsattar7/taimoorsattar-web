"use client"

import React, { useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"

import { XCircle } from "lucide-react"

const Fail = () => {
  useEffect(() => {
    toast.error("Payment failed")
  }, [])

  return (
    <>
      <Toaster position="top-center" />

      <XCircle color="red" className="block mb-8 mx-auto" />

      <div>
        <h3 className="headline text-center m-b-15">Payment Failed</h3>
        <p className="headline headline__text text-center m-b-15">
          Payment not completed. Please try again.
        </p>
      </div>
    </>
  )
}

export default Fail
