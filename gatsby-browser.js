// custom typefaces
import "typeface-roboto"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles

import "./src/global/styles/normalize.css"
import "./src/global/styles/_varibles.scss"

import "./src/global/styles/render.scss"
import "./src/global/styles/_mixin.scss"
import "./src/global/styles/_markdown.scss"
import "./src/style.css"
import "./src/global/styles/_boxModel.scss"
import "./src/global/styles/_md_boxModel.scss"
import "./src/global/styles/_animation.scss"

// Highlighting for code blocks
import "prismjs/themes/prism.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"

import "./src/global/styles/index.css"

import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { broadcastQueryClient } from "react-query/broadcastQueryClient-experimental"
import React from "react"

export const wrapPageElement = ({ element }) => {
  const queryClient = new QueryClient()

  broadcastQueryClient({
    queryClient,
    broadcastChannel: "broadcast-sync",
  })

  return (
    <QueryClientProvider client={queryClient}>
      <>
        {element}
        <ReactQueryDevtools initialIsOpen={false} />
      </>
    </QueryClientProvider>
  )
}
