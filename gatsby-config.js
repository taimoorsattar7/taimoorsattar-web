/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const tailwindConfig = require("./tailwind.config.js")
const siteUrl = `https://taimoorsattar.com`

module.exports = {
  // https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/src/utils/flags.ts
  flags: {
    FAST_DEV: true,
    DEV_SSR: true,
    PARALLEL_QUERY_RUNNING: true,
    QUERY_ON_DEMAND: true,
    PRESERVE_WEBPACK_CACHE: true,
    DEV_WEBPACK_CACHE: true,
    LMDB_STORE: true,
    PARALLEL_SOURCING: true,
    FUNCTIONS: true,
    GRAPHQL_NESTED_SORT_AND_AGGREGATE: true,
  },
  siteMetadata: {
    title: `Taimoor Sattar`,
    author: {
      name: `Taimoor Sattar`,
      summary: `I'm a full-stack developer and educator. I've always been intrigued by languages used elegantly and efficiently, regardless of whether they are interpreted by humans or computers.`,
    },
    description: `I'm Taimoor Sattar, a full-stack developer, experience to develop websites in React/JavaScript, Node, and HTML/CSS.`,
    siteUrl: `https://taimoorsattar.com`,
    social: [
      {
        socialApp: "linkedin",
        url: "https://www.linkedin.com/in/taimoorsattar",
      },
      {
        socialApp: "twitter",
        url: "https://twitter.com/taimoorsattar7",
      },
      {
        socialApp: "tiktok",
        url: "https://www.tiktok.com/@taimoornotes",
      },
    ],
    devstatus: process.env.NODE_ENV,
  },
  plugins: [
    "gatsby-plugin-netlify",
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
        // 1 query for each data type
        query: "",
        // The filepath and name to Index Sitemap. Defaults to '/sitemap.xml'.
        output: "/custom-sitemap.xml",
        mapping: {
          // Each data type can be mapped to a predefined sitemap
        },
        exclude: [
          `/dev-404-page`,
          `/404`,
          `/404.html`,
          "/p/making-sense-of-a-responsive-website",
          /(\/)responsive-website\S*/,
          /(\/)\[main]\S*/,
          /(\/)?hash-\S*/,
          /(\/)\[main]\S*/,
          /(\/)undefined\S*/,
        ],
        createLinkInHead: true, // optional: create a link in the `<head>` of your site
        addUncaughtPages: true, // optional: will fill up pages that are not caught by queries and mapping and list them under `sitemap-pages.xml`
        additionalSitemaps: [
          // optional: add additional sitemaps, which are e. g. generated somewhere else, but need to be indexed for this domain
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
      },
    },
    // OPTION_1
    // {
    //   resolve: "gatsby-source-graphql",
    //   options: {
    //     typeName: "ALL",
    //     fieldName: "all",
    //     url: "https://7p4bxs1b.api.sanity.io/v1/graphql/production/default",
    //     batch: true,
    //   },
    // },
    // OPTION_2
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-N8NNRHB",
        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        //
        // Defaults to null
        defaultDataLayer: { platform: "gatsby" },
      },
    },
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: process.env.GATSBY_SANITY_PROJECT_ID,
        dataset: process.env.GATSBY_SANITY_DATASET,
        // a token with read permissions is required
        // if you have a private dataset
        // token: process.env.GATSBY_SANITY_BEARER_TOKEN,
        // If the Sanity GraphQL API was deployed using `--tag <name>`,
        // use `graphqlTag` to specify the tag name. Defaults to `default`.
        graphqlTag: "default",
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(tailwindConfig),
          require(`autoprefixer`),
        ],
      },
    },
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Your Site's RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/blog/",
            // optional configuration to specify external rss feed, such as feedburner
            // link: "https://feeds.feedburner.com/gatsby/blog",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Taimoor Sattar`,
        short_name: `Taimoor`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/favicon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
  ],
  trailingSlash: "never",
}
