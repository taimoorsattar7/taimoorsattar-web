import React, { useState, useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import axios, { AxiosResponse } from "axios"
import { useForm } from "react-hook-form"

// import { navigate } from "gatsby"

import removeParams from "@lib/removeParams"
import removeTrailing from "@lib/removeTrailing"

import PortableText from "@components/portabletext/portableText"

import LoadingIcon from "@components/icons/loading/LoadingIcon"

import "@styles/_field.scss"

// @ts-ignore
import { useSiteMetadata } from "@hooks/use-site-metadata.tsx"

const Form = ({ productPrice, location, onModalState }: any) => {
  const [SPrice, setSPrice] = useState<{
    _key?: number | null
    price?: number | null
    priceID?: String | null
    description?: String | null
    amount?: Number | null
  }>({
    _key: null,
    price: null,
    priceID: null,
    description: "",
    amount: null,
  })

  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm()

  useEffect(() => {
    if (productPrice?.plans?.length > 0) {
      setSPrice({
        _key: productPrice?.plans[0]?._key,
        description: productPrice?.plans[0]?._rawDescription,
        priceID: productPrice?.plans[0]?.priceID,
      })
    }
  }, [])

  const [disable, setDisable] = useState(false)
  let buildMeta = useSiteMetadata()
  const redirectCKout = async (data: {
    price_ID: any
    email: any
    name: any
    priceRef: any
  }) => {
    let hrefURL = removeTrailing(removeParams(location.href))

    try {
      const {
        data: { url },
      } = await axios.post("/api/checkout", {
        email: data.email,
        name: data.name,
        mode: "subscription",
        priceId: data.price_ID,
        metadata: {
          priceId: data.price_ID,
          priceRef: data.priceRef,
        },
        allow_promotion_codes: true,
        cancelUrl: `${hrefURL}?state=fail`,
        successUrl: `${location.origin}/api/createSubscription?name=${data.name}&email=${data.email}&priceId=${data.price_ID}&priceRef=${data.priceRef}&redirectOrigin=${hrefURL}`,
      })

      window.location = url
    } catch (error) {}
  }

  async function yesSubmit(data: { name: any; price: any; email: any }) {
    setDisable(true)

    try {
      if (!data.price) {
        try {
          await axios.post(`/api/newsletter`, {
            name: String(data.name),
            email: String(data.email),
          })
        } catch (error) {}

        try {
          await axios.post(`/api/sendEmailTemplate`, {
            templateId: "d-c46966ad6ce5402aa1489198b511ddd1",
            subject:
              "Build Website With Gatsby, Sanity, And Stripe course - Taimoor Sattar",
            email: String(data.email),
            metadata: {
              name: String(data.name),
            },
          })
        } catch (error) {}

        onModalState("success")

        toast("Successfully Subscribed!", {
          icon: "👏",
        })
      } else {
        await redirectCKout({
          price_ID: data.price,
          email: data.email,
          name: data.name,
          priceRef: productPrice._id,
        })
        setDisable(false)
      }
    } catch (e) {
      setDisable(false)
    }
  }

  return (
    <>
      <Toaster position="top-center" />
      <form className="field" onSubmit={handleSubmit(yesSubmit)}>
        <div className="field--gap">
          <label
            className="headline headline__sml headline--white field__label"
            htmlFor="name"
          >
            Name
          </label>

          <input
            {...register("name", { required: true })}
            className="headline headline__text field__input"
            type="text"
            placeholder="Enter your name here..."
            autoComplete="on"
            required
          />
        </div>
        <div className="field--gap">
          <label
            className="headline headline__sml headline--white field__label"
            htmlFor="email"
          >
            Email
          </label>

          <input
            {...register("email", { required: true })}
            className="headline headline__text field__input"
            type="email"
            placeholder="example@email.com"
            autoComplete="on"
            required
          />
        </div>
        <div className="m-b-25">
          <fieldset>
            <legend className="sr-only">Select the plan</legend>
            <div className="-space-y-px bg-white rounded-md">
              {productPrice?.plans.map(
                (prc: any, index: React.Key | null | undefined) => {
                  return (
                    <div
                      key={index}
                      className={`relative border p-4 flex flex--items-center flex--justify-start ${
                        watch("price") ==
                        (buildMeta.devstatus == "development"
                          ? prc.priceID_test
                            ? prc.priceID_test
                            : ""
                          : prc.priceID
                          ? prc.priceID
                          : "")
                          ? "bg-indigo-100 border-indigo-200"
                          : "border border-gray-200"
                      } z-10`}
                    >
                      <div className="flex items-center h-5">
                        <input
                          id={prc.keyword}
                          {...register("price")}
                          value={
                            buildMeta.devstatus == "development"
                              ? prc.priceID_test
                              : prc.priceID
                          }
                          type="radio"
                          className={`h-4 w-4 text-indigo-600 ${
                            watch("price") == "" ||
                            watch("price") ==
                              (buildMeta.devstatus == "development"
                                ? prc.priceID_test
                                  ? prc.priceID_test
                                  : ""
                                : prc.priceID
                                ? prc.priceID
                                : "")
                              ? "focus:ring-indigo-500"
                              : "border-gray-300"
                          } cursor-pointer `}
                        />
                      </div>
                      <label
                        htmlFor={prc.keyword}
                        className="ml-3 cursor-pointer"
                      >
                        <span
                          className={`block text-sm font-medium  ${
                            watch("price") ==
                            (buildMeta.devstatus == "development"
                              ? prc.priceID_test
                                ? prc.priceID_test
                                : ""
                              : prc.priceID
                              ? prc.priceID
                              : "")
                              ? "text-indigo-900"
                              : "text-gray-800"
                          }`}
                        >
                          {prc.keyword}
                          {/* {" - "}
                          {prc.price ? prc.price : "Free"}
                          {prc.currency == "euro" ? "€" : ""}
                          {" / "}
                          {"month"} */}
                        </span>
                        <span
                          className={`block text-sm ${
                            watch("price") ==
                            (buildMeta.devstatus == "development"
                              ? prc.priceID_test
                                ? prc.priceID_test
                                : ""
                              : prc.priceID
                              ? prc.priceID
                              : "")
                              ? "text-indigo-700"
                              : "text-gray-600"
                          } `}
                        >
                          <PortableText blocks={prc?._rawDescription} />
                        </span>
                      </label>
                    </div>
                  )
                }
              )}
            </div>
          </fieldset>
        </div>
        <button className={"btn btn__curv"} disabled={disable ? true : false}>
          <div className="flex flex--items-center">
            {disable == true && (
              <span className="in-block m-r-5 w25 h25">
                <LoadingIcon />
              </span>
            )}

            <span className="headline headline__text headline--white headline--uppercase">
              <b>
                {!watch("price") ? (
                  <i id="free-course-check">Open House Content →</i>
                ) : (
                  <i id="proceed-checkout">Proceed to checkout 💳 →</i>
                )}
              </b>
            </span>
          </div>
        </button>
      </form>
    </>
  )
}

export default Form
