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
