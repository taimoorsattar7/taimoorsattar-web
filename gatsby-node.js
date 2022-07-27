const Axios = require(`axios`)
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  // Create pages here
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createRedirect } = actions

  await createBlogPostPages(graphql, actions, reporter)
  await createProjectPages(graphql, actions, reporter)

  createRedirect({
    fromPath: "/books/workflow-to-build-static-website",
    toPath: "/p/build-standout-website",
    statusCode: 200,
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/books/how-to-build-JAMstack-site",
    toPath: "/p/build-standout-website",
    statusCode: 200,
    isPermanent: true,
  })
  createRedirect({
    fromPath:
      "/blogs/monolithic-and-microservice-architecture-for-website-development",
    toPath: "/blogs/what-is-jamstack",
    statusCode: 200,
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/modules/[main]/*",
    toPath: "/modules/build-a-standout-website/*",
    statusCode: 301,
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/modules/%5Bmain%5D/*",
    toPath: "/modules/build-a-standout-website/*",
    statusCode: 301,
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/modules/undefined/*",
    toPath: "/modules/build-a-standout-website/*",
    statusCode: 301,
    isPermanent: true,
  })
}

async function createProjectPages(graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityProduct(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const projectEdges = (result.data.allSanityProduct || {}).edges || []

  projectEdges.forEach(edge => {
    const id = edge.node.id
    const slug = edge.node.slug.current
    const path = `p/${slug}/`

    reporter.info(`Creating product page: ${path}`)

    createPage({
      path,
      component: require.resolve(`./src/templates/product-post.tsx`),
      context: { id },
    })
  })
}

async function createBlogPostPages(graphql, actions, reporter) {
  const { createPage } = actions

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const currentPostId = posts[index].id
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      let slug_pg = post.fields.slug

      reporter.info(`Creating blog page: ${slug_pg}`)

      if (slug_pg.includes("/blogs")) {
        createPage({
          path: post.fields.slug,
          component: require.resolve(`./src/templates/blog-post.tsx`),
          context: {
            id: post.id,
            currentPostId,
            previousPostId,
            nextPostId,
          },
        })
      }
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        fs: false,
      },
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@lib": path.resolve(__dirname, "src/lib"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
      },
    },
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
