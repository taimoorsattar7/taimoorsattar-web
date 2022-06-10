import React from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs"

export default ({ node }: any) => {
  if (!node || !node.code) {
    return null
  }
  const { language, code } = node
  return (
    <SyntaxHighlighter
      className="px-6 py-4 max-h-96"
      style={github}
      showLineNumbers={false}
      wrapLines={true}
      language={language || "text"}
    >
      {code}
    </SyntaxHighlighter>
  )
}
