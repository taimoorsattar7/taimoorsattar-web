import React from "react"
import { CheckIcon } from "@heroicons/react/20/solid"
import Button from "@atom/button/index"

const tiers = [
  {
    name: "Open House",
    id: "open-house",
    href: "#",
    priceMonthly: "0",
    description:
      "Introduction to using Gatsby and deploying a website on Netlify",
    features: [
      "Get Started with Gatsby",
      "Git and Github",
      "Deploy your website using Netlify",
    ],
    featured: false,
  },
  {
    name: "Master",
    id: "master",
    href: "#",
    priceMonthly: "$35",
    priceRecurring: "$9",
    description:
      "Create a subscription website to collect payments from users based on the plan you offer.",
    features: [
      "++ Everything include in Free Open House",
      "Create checkout and collect payments",
      "Create Subscription using Stripe",
      "Create contact form",
      "Manage content in the Sanity Studio",
      "Refund and Cancel user's Subscription",
    ],
    featured: true,
  },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

export default function Pricing({ setShowModal, setModalState }: any) {
  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
        You have found the right price for the course that you are looking for.
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured
                ? "relative bg-gray-900 shadow-2xl"
                : "bg-white/60 sm:mx-8 lg:mx-0",
              tier.featured
                ? ""
                : tierIdx === 0
                ? "rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl"
                : "sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none",
              "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10"
            )}
          >
            <h3
              id={tier.id}
              className={classNames(
                tier.featured ? "text-indigo-400" : "text-indigo-600",
                "text-base font-semibold leading-7"
              )}
            >
              {tier.name}
            </h3>
            <p className="mt-4 items-baseline gap-x-2">
              {Number(tier?.priceMonthly) !== Number(0) ? (
                <>
                  <div className="block">
                    <span
                      className={classNames(
                        tier.featured ? "text-white" : "text-gray-900",
                        "text-5xl font-bold tracking-tight"
                      )}
                    >
                      {tier.priceMonthly}
                    </span>
                    <span
                      className={classNames(
                        tier.featured ? "text-gray-400" : "text-gray-500",
                        "text-base"
                      )}
                    >
                      {tier.priceRecurring ? "/ first month" : "/ month"}
                    </span>
                  </div>

                  <p className="text-white">
                    After that, you will pay {tier.priceRecurring} USD per month
                  </p>
                </>
              ) : (
                <>
                  <span
                    className={classNames(
                      tier.featured ? "text-white" : "text-gray-900",
                      "text-5xl font-bold tracking-tight"
                    )}
                  >
                    Free
                  </span>
                </>
              )}
            </p>
            <p
              className={classNames(
                tier.featured ? "text-gray-300" : "text-gray-600",
                "mt-6 text-base leading-7"
              )}
            >
              {tier.description}
            </p>
            <ul
              role="list"
              className={classNames(
                tier.featured ? "text-gray-300" : "text-gray-600",
                "mt-8 space-y-3 text-sm leading-6 sm:mt-10"
              )}
            >
              {tier.features.map(feature => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className={classNames(
                      tier.featured ? "text-indigo-400" : "text-indigo-600",
                      "h-6 w-5 flex-none"
                    )}
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              textValue="Get started today"
              iconRight="sparkle"
              className="mt-8"
              btnSize="large"
              btnTheme="outline"
              onClickHandler={() => {
                setShowModal(true)
                setModalState("form")
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
