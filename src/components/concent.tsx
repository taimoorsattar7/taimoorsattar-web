import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

export default function Concent({ timer }: any) {
  const [display, setDisplay] = useState(false)

  const closeOnEscapeKeyDown = (e: { charCode: any; keyCode: any }) => {
    if ((e.charCode || e.keyCode) === 27) {
      setDisplay(false)
    }
  }

  useEffect(() => {
    const clrtime = setTimeout(() => {
      setDisplay(true)
    }, timer || 0)

    document.body.addEventListener("keydown", closeOnEscapeKeyDown)

    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown)
      clearTimeout(clrtime)
    }
  }, [])

  if (!display) {
    return <></>
  }

  return (
    <>
      <div className="fixed left-0 bottom-0 z-40 ">
        <div className="fixed sm:left-4 bottom-20 rounded-lg bg-white shadow-2xl w-full sm:w-1/2 xl:w-1/4 max-w-[450px] overflow-hidden">
          <div className="">
            <button
                onClick={()=>{setDisplay(false)}}
              type="button"
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Close menu</span>

              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative overflow-hidden px-8 pt-8 pb-6">
              <div
                width="80"
                height="77"
                className="absolute -top-10 -right-10 text-yellow-500"
              >
                <svg
                  width="120"
                  height="119"
                  viewBox="0 0 120 119"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.3"
                    d="M6.38128 49.1539C3.20326 32.893 13.809 17.1346 30.0699 13.9566L70.3846 6.07751C86.6455 2.89948 102.404 13.5052 105.582 29.7661L113.461 70.0808C116.639 86.3417 106.033 102.1 89.7724 105.278L49.4577 113.157C33.1968 116.335 17.4384 105.729 14.2604 89.4686L6.38128 49.1539Z"
                    fill="blue"
                    // #e0e7eb
                  />
                </svg>
              </div>
              <div className="text-2xl flex flex-col pb-4">
                <span className="text-xl font-bold">
                  Learn React Framework Gatsby
                </span>
              </div>
              <div className="pb-4">
                <p>
                  Gatsby is the React-based framework to build static and
                  dynamic websites. In this course, we'll build a subscription
                  platform using Gatsby, Sanity, and Stripe.
                </p>
              </div>

              <div className="pb-4">
                <Link to="/p/build-standout-website" className="text-sky-800">
                  <b>Go to the course →</b>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
