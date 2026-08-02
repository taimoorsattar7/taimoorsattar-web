import React, { useState } from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { Check, Copy } from "lucide-react"

const CodePreview = ({ value }: any) => {
  const [copied, setCopied] = useState(false)
  if (!value || !value.code) {
    return null
  }
  const { language, code, filename } = value

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-zinc-800 bg-[#0d1117] shadow-xl text-sm font-mono not-prose">
      <div className="px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 text-xs text-zinc-400 font-sans flex items-center justify-between">
        <span className="font-semibold text-zinc-300">{filename || language || "code"}</span>
        <div className="flex items-center gap-3">
          {language && <span className="uppercase text-[10px] font-bold text-teal-400 tracking-wider">{language}</span>}
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
            title="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
      <div className="p-4 overflow-x-auto whitespace-pre leading-relaxed text-zinc-100">
        <SyntaxHighlighter
          language={language || "javascript"}
          style={atomOneDark}
          customStyle={{
            margin: 0,
            padding: 0,
            background: "transparent",
            fontSize: "0.875rem",
            lineHeight: "1.6",
          }}
          codeTagProps={{
            style: { fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default CodePreview
