"use client"

import React, { useState, useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import axios, { AxiosResponse } from "axios"
import { useForm } from "react-hook-form"
import SelectMenu from "@components/SelectMenu"

import Button from "@atom/button/index"

import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid"
// import { navigate } from "gatsby"

import removeParams from "@lib/removeParams"
import removeTrailing from "@lib/removeTrailing"

import PortableText from "@components/portabletext/portableText"

import InputField from "@molecule/input-field/index"

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
    formState: { errors },
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

  async function yesSubmit(data: {
    name: any
    price: any
    email: any
  }): Promise<void> {
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
      <form
        className="field"
        onSubmit={handleSubmit((evt: any) => yesSubmit(evt))}
      >
        <InputField
          register={register}
          aria-invalid={errors.name ? "true" : "false"}
          id="name"
          labelText="Please enter your Name"
          message={errors?.name ? "Please correct this field" : ""}
          status={errors?.name ? "error" : "normal"}
          type="text"
          placeholder="Your Name"
          options={{
            required: true,
            maxLength: 50,
          }}
          required={true}
        />

        <InputField
          register={register}
          aria-invalid={errors.email ? "true" : "false"}
          id="email"
          labelText="Type your Email"
          message={errors?.email ? "Please correct this field" : ""}
          status={errors?.email ? "error" : "normal"}
          type="email"
          placeholder="yours@email.com"
          options={{ required: true }}
          required={true}
        />

        <div className="mb-8">
          <fieldset className="m-0 p-0 border-2 rounded-sm border-indigo-100">
            <legend className="text-gray-600 px-1 text-sm">
              Select the plan
            </legend>
            <div className="-space-y-px bg-white rounded-md">
              {productPrice?.plans.map(
                (prc: any, index: React.Key | null | undefined) => {
                  return (
                    <div
                      key={index}
                      className={`border p-2 flex flex--items-center flex--justify-start ${
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
                      <div className="flex items-center">
                        <input
                          id={prc.keyword}
                          {...register("price")}
                          value={
                            buildMeta.devstatus == "development"
                              ? prc.priceID_test
                              : prc.priceID
                          }
                          type="radio"
                          className={`border-2 border-cyan-900 text-indigo-600 ${
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
                              : " border-2 border-cyan-900"
                          }`}
                        />
                      </div>
                      <label
                        htmlFor={prc.keyword}
                        className="ml-3 cursor-pointer"
                      >
                        <span
                          className={`m-0 p-0 block text-sm font-medium  ${
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
        <Button
          textValue={
            !watch("price") ? (
              <i id="free-course-check">Open House Content</i>
            ) : (
              <i id="proceed-checkout">Proceed to checkout</i>
            )
          }
          type="submit"
          disabled={disable ? true : false}
          iconRight={!watch("price") ? "backpack" : "walletcards"}
          btnSize="med"
          btnTheme="indigo"
          // onClickHandler={() => {
          //   setModalState("form")
          //   setShowModal(true)
          // }}
        />
      </form>
    </>
  )
}

export default Form
