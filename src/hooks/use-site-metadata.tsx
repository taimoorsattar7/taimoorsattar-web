import { graphql, useStaticQuery } from "gatsby"

type Props = {
  site: {
    siteMetadata: {
      title: string
      siteUrl: string
      description: string
      social: any
      devstatus: any
    }
  }
}

export const useSiteMetadata = () => {
  const { site } = useStaticQuery<Props>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
            description
            social {
              twitter
            }
            devstatus
          }
        }
      }
    `
  )

  return site.siteMetadata
}
