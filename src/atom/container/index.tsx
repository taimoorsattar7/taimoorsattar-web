import * as React from "react"
// import { FunctionComponent } from "react"

const Container: any = ({ children, size }: any) => {
  return (
    <section className="m-t-25 m-b-35">
      <div className="wrapper wrapper--narrow">{children}</div>
    </section>
  )
}

export default Container
