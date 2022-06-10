import React, { useEffect, useState } from "react"

import Layout from "@components/layout"

import { Link, navigate, PageProps } from "gatsby"
import { isLoggedIn, getCurrentUser } from "@utils/auth.ts"
import Axios, { AxiosResponse } from "axios"
import toast, { Toaster } from "react-hot-toast"

import { querySanity } from "@lib/querySanity.ts"
import { format, compareAsc } from "date-fns"

// import { format, compareAsc } from 'date-fns'

const Settings: React.FC<PageProps<any>> = ({ location }: any) => {
  const [subscriptions, setSubscriptions] = useState<any>(null)
  useEffect(() => {
    if (!isLoggedIn()) {
      // logout()
      navigate("/auth")
    } else {
      fetchSupscription()
    }
  }, [subscriptions])

  async function fetchSupscription() {
    let { email } = getCurrentUser()

    let dataQuery = await querySanity(`
    *[_type == 'subscriptions' && customer._ref in *[_type=='customer' && email=='${email}']._id]{
      _id, _type, customer,
      status,
      cancel_at_period_end, canceled_at, cancel_at,
      start_date, price,
      'module': price->content->{
        _id, _type, title, seo, 
        'img': seo.image.asset->{_updatedAt, extension, originalFilename, url}
        , slug}}
    `)

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

  function isDataLarge(date) {
    let bool = compareAsc(new Date(), new Date(date))
    return bool == -1 ? true : false
  }

  if (subscriptions == null) {
    return (
      <Layout location={location}>
        <section className="m-t-25 p-b-35">
          <div className="wrapper wrapper--narrow">
            <div className="flex items-center justify-center mb-8">
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                  className={`flex items-center h-10 px-2 py-2 -mb-px text-center ${
                    location.pathname == "/modules"
                      ? "text-indigo-600 dark:border-indigo-400 cursor-base"
                      : "border-transparent text-gray-700 dark:text-white hover:border-gray-400"
                  }  bg-transparent border-b-2 border-indigo-500 sm:px-4 -px-1  dark:text-indigo-300 whitespace-nowrap focus:outline-none`}
                >
                  <Link className="no-underline" to="/modules">
                    <span className="mx-1 text-sm sm:text-base"> Modules </span>
                  </Link>
                </button>

                <button
                  className={`flex items-center h-10 px-2 py-2 -mb-px text-center ${
                    location.pathname == "/settings"
                      ? "text-indigo-600 dark:border-indigo-400 cursor-base"
                      : "border-transparent text-gray-700 dark:text-white hover:border-gray-400"
                  }  bg-transparent border-b-2 border-indigo-500 sm:px-4 -px-1  dark:text-indigo-300 whitespace-nowrap focus:outline-none`}
                >
                  <Link className="no-underline" to="/settings">
                    <span className="mx-1 text-sm sm:text-base">
                      {" "}
                      Settings{" "}
                    </span>
                  </Link>
                </button>
              </div>
            </div>
            <p className="text-base">Please wait your data is loading...</p>
          </div>
        </section>
      </Layout>
    )
  }

  return (
    <Layout location={location}>
      <Toaster position="top-center" />
      <section className="m-t-25 p-b-35">
        <div className="wrapper wrapper--narrow">
          <div className="flex items-center justify-center mb-8">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                className={`flex items-center h-10 px-2 py-2 -mb-px text-center ${
                  location.pathname == "/modules"
                    ? "text-indigo-600 dark:border-indigo-400 cursor-base"
                    : "border-transparent text-gray-700 dark:text-white hover:border-gray-400"
                }  bg-transparent border-b-2 border-indigo-500 sm:px-4 -px-1  dark:text-indigo-300 whitespace-nowrap focus:outline-none`}
              >
                <Link className="no-underline" to="/modules">
                  <span className="mx-1 text-sm sm:text-base"> Modules </span>
                </Link>
              </button>

              <button
                className={`flex items-center h-10 px-2 py-2 -mb-px text-center ${
                  location.pathname == "/settings"
                    ? "text-indigo-600 dark:border-indigo-400 cursor-base"
                    : "border-transparent text-gray-700 dark:text-white hover:border-gray-400"
                }  bg-transparent border-b-2 border-indigo-500 sm:px-4 -px-1  dark:text-indigo-300 whitespace-nowrap focus:outline-none`}
              >
                <Link className="no-underline" to="/settings">
                  <span className="mx-1 text-sm sm:text-base"> Settings </span>
                </Link>
              </button>
            </div>
          </div>

          <div className="prose max-w-fit m-b-20">
            <p>
              For the subscription action, the user has two (2) options as
              below:
            </p>
            <ul>
              <li>
                <b>Cancel Subscription:</b> Cancel the subscription at the end
                of the period. You'll still be able to view content before the
                end of the period.
              </li>

              <li>
                <b> Resume Subscription:</b>You can resume the subscription
                after you cancel the subscription.
              </li>
            </ul>

            <p>
              If you have any questions, you can fill out this contact form or
              send the email at taimoor@taimoorsattar.dev
            </p>

            <p>
              Below, you can view the list of your subscription for the course.
            </p>
          </div>

          {/* {JSON.stringify(subscriptions)} */}

          {subscriptions ? (
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
                          <button
                            className="px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
                            onClick={() =>
                              cancelSubscription({
                                _id: sub._id,
                                actionReq: "dont_cancel",
                                confirmMsg:
                                  "Do you want to resume the subsciption.",
                              })
                            }
                          >
                            Resume Subscription
                          </button>
                        )}
                        {sub.cancel_at_period_end == false && (
                          <button
                            className="px-4 py-2 text-base text-white uppercase bg-red-700 border-red-800 rounded focus:outline-none hover:shadow hover:bg-red-600"
                            onClick={() =>
                              cancelSubscription({
                                _id: sub._id,
                                confirmMsg:
                                  "Do you want to cancel the subsciption at the end of trial period.",
                              })
                            }
                          >
                            Cancel Subscription
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="headline headline__text">
              Please wait while we are loading your data
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default Settings
