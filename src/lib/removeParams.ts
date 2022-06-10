export default function removeParams(url: string) {
  var urlParts = url.split("?")
  return urlParts[0]
}
