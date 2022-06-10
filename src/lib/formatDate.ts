export const formatDate = (yourDate: { toISOString: () => string }) => {
  //date: YYYY-MM-DDTHH:mm:ss:sssZ
  return yourDate.toISOString().split("T")[0]
}
