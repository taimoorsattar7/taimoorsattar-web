"use client"

import React, { useEffect } from "react"
import axios, { AxiosResponse } from "axios"

import toast, { Toaster } from "react-hot-toast"
import { getCurrentUser, isLoggedIn } from "@utils/auth"

import LoadingIcon from "@components/icons/loading/LoadingIcon"

const Pending = ({ productPrice }: any) => {
  useEffect(() => {
    toast(" Please Wait... we're checking your subscription", {
      icon: "⌛",
    })

    if (isLoggedIn()) {
      checkSubsciption()
    }
  }, [isLoggedIn()])

  async function checkSubsciption() {
    try {
      if (isLoggedIn()) {
        const ourRequest = axios.CancelToken.source()
        let productRef = productPrice.content._id
        let { token } = getCurrentUser()
        await axios.get(
          `/api/isSubscribe?token=${token}&productRef=${productRef}`,
          { cancelToken: ourRequest.token }
        )
        // if (status >= 200 && status <= 300) {}

        return () => {
          ourRequest.cancel()
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className="m-auto flex items-center justify-center h10 w10 circle bg-green">
        <LoadingIcon />
      </div>

      <div>
        <h3
          className="text-lg leading-6 font-medium text-gray-900"
          id="modal-title"
        >
          Please Wait ⌛
        </h3>
        <p className="headline headline__text text-center m-b-15">
          Please wait while we confirm your payment.
        </p>
      </div>
    </>
  )
}

export default Pending
