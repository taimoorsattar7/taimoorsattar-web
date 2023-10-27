import React from "react"

export default ({ node }: any) => {
  if (!node || !node.table) {
    return null
  }
  return (
    <>
      <table>
        <tbody>
          {node?.rows?.map((row: any, index: any) => {
            return (
              <tr key={index}>
                {row.cells?.map((cell: any, index: any) => {
                  return <td key={index}>{cell}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
