import "normalize.css"
import "./src/global/styles/index.css"
import "./src/global/styles/render.scss"
import "./src/style.css"

// Highlighting for code blocks
import "prismjs/themes/prism.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"

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
