export const useSiteMetadata = () => {
  return {
    title: "Taimoor Sattar",
    siteUrl: "https://taimoorsattar.com",
    description: "Personal website, blog, and courses by Taimoor Sattar.",
    social: {
      twitter: "https://twitter.com/taimoorsattar7",
    },
    devstatus: process.env.NODE_ENV,
  }
}
