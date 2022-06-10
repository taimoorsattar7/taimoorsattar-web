import React from "react"

export default ({ node }: any) => {
  // if (!node || !node.code) {
  //   return null
  // }
  return (
    <div>
      <a
        href={node.asset.url}
        id="button"
        className="inline-flex group rounded-md shadow bg-blue-500 text-white cursor-pointer justify-between items-center overflow-hidden transition-all hover:glow no-underline"
      >
        <div className="px-3 mt-2 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
            />
          </svg>
        </div>

        <p className="px-4 mt-2 mb-2">
          {node.asset.originalFilename} - {node.asset.size / 10000} MB
        </p>
      </a>
    </div>
  )
}
