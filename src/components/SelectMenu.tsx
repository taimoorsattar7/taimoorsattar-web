import React, { Fragment, useState } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid"

const publishingOptions = [
  {
    title: "Published",
    description: "This job posting can be viewed by anyone who has the link.",
    current: true,
  },
  {
    title: "Draft",
    description: "This job posting will no longer be publicly accessible.",
    current: false,
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function SelectMenu() {
  const [selected, setSelected] = useState(publishingOptions[0])

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <p className={selected ? "font-semibold" : "font-normal"}>HIJHJHB</p>
        {selected ? (
          <span className={true ? "text-white" : "text-indigo-600"}>
            <CheckIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        ) : null}
      </div>
      <p
        className={classNames(
          true ? "text-indigo-200" : "text-gray-500",
          "mt-2"
        )}
      >
        There we go
      </p>
    </div>
  )
}
