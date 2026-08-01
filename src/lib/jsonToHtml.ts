export function jsonToHtml(jsonStr: string) {
  const obj = JSON.parse(jsonStr)

  let html = ""
  obj["blocks"]?.forEach(function (
    block: any
  ) {
    switch (block["type"]) {
      case "paragraph":
        html += "<p>" + block["data"]["text"] + "</p>"
        break

      case "header":
        html +=
          "<h" +
          block["data"]["level"] +
          ">" +
          block["data"]["text"] +
          "</h" +
          block["data"]["level"] +
          ">"
        break

      case "raw":
        html += block["data"]["html"]
        break

      case "list":
        const lsType = block["data"]["style"] === "ordered" ? "ol" : "ul"
        html += "<" + lsType + ">"
        block["data"]["items"]?.forEach(function (item: any) {
          html += "<li>" + item + "</li>"
        })
        html += "</" + lsType + ">"
        break

      case "code":
        html +=
          '<pre><code class="language-' +
          block["data"]["lang"] +
          '">' +
          block["data"]["code"] +
          "</code></pre>"
        break

      case "image":
        html +=
          '<div class="img_pnl"><img src="' +
          block["data"]["file"]["url"] +
          '" /></div>'
        break

      default:
        break
    }
  })

  return html
}
