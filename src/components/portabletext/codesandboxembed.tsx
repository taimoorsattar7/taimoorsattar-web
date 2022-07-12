import React from "react"

export const CodesandboxEmbed = (props: any) => {
  if (!props?.node?.url) {
    return <div>Missing CodeSandbox URL</div>
  }

  return (
    <iframe
      src={props?.node?.url}
      style={{
        width: "100%",
        height: "500px",
        border: "0",
        borderRadius: "4px",
        overflow: "hidden",
      }}
      title={props?.node?.url ? props?.node?.url : "Codesandbox Project"}
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  )
}
