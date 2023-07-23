import React, { useEffect, useState } from "react"

import Layout from "@components/layout"

import { navigate, PageProps } from "gatsby"
import { isLoggedIn, getCurrentUser } from "@utils/auth"
import Axios, { AxiosResponse } from "axios"
import toast, { Toaster } from "react-hot-toast"

import { format, compareAsc } from "date-fns"
import { sanityRequest } from "@lib/sanity/sanityActions"

import LoadingAnima from "@atom/loading-anima/index"
import Button from "@atom/button/index"
import HorizontalNavbar from "@atom/horizontal-navbar/index"

const Settings: React.FC<PageProps<any>> = ({ location }: any) => {
  const [subscriptions, setSubscriptions] = useState<any>(null)
  useEffect(() => {
    if (!isLoggedIn()) {
      // logout()
      navigate("/auth")
    } else {
      fetchSupscription()
    }
  }, [])

  async function fetchSupscription() {
    let { email } = getCurrentUser()

    let dataQuery = await sanityRequest(
      `*[_type == 'subscriptions' && customer._ref in *[_type=='customer' && email=='${email}']._id]{
        _id, _type, customer,
        status,
        cancel_at_period_end, canceled_at, cancel_at,
        start_date, price,
        'module': price->content->{
          _id, _type, title, seo, 
          'img': seo.image.asset->{_updatedAt, extension, originalFilename, url}
          , slug}}
      `
    )

    setSubscriptions(dataQuery)
  }

  async function cancelSubscription(req: any) {
    let is = confirm(req.confirmMsg)
    if (is) {
      toast.success("Wait... Request sent", {
        icon: "⌛",
      })
      let { token } = getCurrentUser()
      try {
        console.log({
          token: token,
          subID: req._id,
          actionReq: req.actionReq,
        })
        let { data, status }: AxiosResponse<any> = await Axios.post(
          `/api/cancelSubscription`,
          {
            token: token,
            subID: req._id,
            actionReq: req.actionReq,
          }
        )

        if (data.message === "success" && status == 200) {
          toast.success("Your request is fulfilled.")
        }

        setSubscriptions(false)

        navigate("/settings")

        return data
      } catch (error) {
        toast.success("Something went wrong.", {
          icon: "⚠️",
        })
      }
    }
  }

  function isDataLarge(date: string | number | Date) {
    let bool = compareAsc(new Date(), new Date(date))
    return bool == -1 ? true : false
  }

  return (
    <Layout location={location}>
      <Toaster position="top-center" />
      <section className="m-t-25 p-b-35">
        <div className="wrapper wrapper--narrow">
          <HorizontalNavbar
            nav={[
              {
                title: "Modules",
                goto: "/modules",
                state: location.pathname == "/modules" ? "active" : "",
              },
              {
                title: "Settings",
                goto: "/settings",
                state: location.pathname == "/settings" ? "active" : "",
              },
            ]}
          />

          {subscriptions == null ? (
            <LoadingAnima />
          ) : (
            <>
              <div className="prose prose-base max-w-fit m-b-20">
                <p>
                  For the subscription action, the user has two (2) options as
                  below:
                </p>
                <ul>
                  <li>
                    <b>Cancel Subscription:</b> Cancel the subscription at the
                    end of the period. You'll still be able to view content
                    before the end of the period.
                  </li>

                  <li>
                    <b> Resume Subscription:</b>You can resume the subscription
                    after you cancel the subscription.
                  </li>
                </ul>

                <p>
                  If you have any questions, you can fill out this contact form
                  or send the email at taimoor@taimoorsattar.dev
                </p>

                <p>
                  Below, you can view the list of your subscription for the
                  course.
                </p>
              </div>
              <div className="flex justify-start flex--wrap flex--align-stretch">
                {subscriptions?.map((sub: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="max-w-xs mx-auto overflow-hidden bg-white rounded-md shadow-lg"
                    >
                      <img
                        className="object-cover w-full h-52"
                        src={sub?.module?.img?.url}
                        alt="Hotel Room"
                      />
                      <div className="px-6 py-7">
                        <div className="inline-block px-1 py-1 mb-3 text-sm text-green-500 capitalize border border-gray-300 rounded-md">
                          Active
                        </div>

                        <div className="text-2xl text-gray-900">
                          {sub.module.title}
                        </div>

                        <hr className="mt-3 mb-5" />

                        {sub.start_date && (
                          <span className="text-gray-400 text-sm mt-2.5 mb-6 block">
                            <b>
                              Start date{": "}
                              {format(new Date(sub.start_date), "MM LLL, yyyy")}
                            </b>
                          </span>
                        )}

                        {sub.cancel_at && isDataLarge(sub.cancel_at) && (
                          <span className="text-gray-400 text-sm mt-2.5 mb-6 block">
                            <b>
                              Cancel at{": "}
                              {format(new Date(sub.cancel_at), "MM LLL, yyyy")}
                            </b>
                          </span>
                        )}

                        <div>
                          {sub.cancel_at_period_end == true && (
                            <Button
                              textValue="Resume Subscription"
                              iconRight="sparkle"
                              btnSize="med"
                              btnTheme="outline"
                              onClickHandler={() => {
                                cancelSubscription({
                                  _id: sub._id,
                                  actionReq: "dont_cancel",
                                  confirmMsg:
                                    "Do you want to resume the subsciption.",
                                })
                              }}
                            />
                          )}
                          {sub.cancel_at_period_end == false && (
                            <Button
                              textValue="Cancel Subscription"
                              iconRight="wallet"
                              btnSize="med"
                              btnTheme="indigo"
                              onClickHandler={() => {
                                cancelSubscription({
                                  _id: sub._id,
                                  confirmMsg:
                                    "Do you want to cancel the subsciption at the end of trial period.",
                                })
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default Settings
