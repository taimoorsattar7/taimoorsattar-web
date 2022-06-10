import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import AnimateLayout from "@components/AnimateLayout"
import SEO from "@components/seo"
import SiteBanner from "@components/site-banner"

const BlogIndex: React.FC<PageProps<any>> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  const avatar = data.avatar?.childImageSharp?.fixed

  if (posts.length === 0) {
    return (
      <AnimateLayout location={location} title={siteTitle}>
        <SEO
          location={location}
          title="Taimoor Sattar"
          description="My name is Taimoor Sattar and I'm a full-stack developer and
          educator. I've been building websites for quite a long time. I
          have experience building modern websites with Gatsby/Next.js,
          Node.js, and MongoDB/Sanity/harperdb."
        />

        <SiteBanner />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </AnimateLayout>
    )
  }

  return (
    <AnimateLayout location={location} title={siteTitle}>
      <SEO
        title="Taimoor Sattar - Full-stack developer"
        description="My name is Taimoor Sattar, a full-stack developer. I have a bachelor's degree in engineering, but love to code."
        image={avatar?.src ?? ""}
        location={location}
      />

      <div className="wrapper wrapper--narrow p-b-50">
        <SiteBanner />
        <ol
          style={{
            listStyle: `none`,
            margin: "0",
            padding: "0",
          }}
        >
          {posts.map((post: any) => {
            const title = post.frontmatter.title || post.fields.slug

            return (
              <li key={post.fields.slug}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <small className="headline headline__sml">
                      {post.frontmatter.date}
                    </small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      className="headline headline__text"
                      itemProp="description"
                    />
                  </section>
                </article>
              </li>
            )
          })}
        </ol>

        <div>
          <Link className="block headline headline__text m-t-30" to="/blogs/">
            <b>View more blogs &#8594;</b>
          </Link>
        </div>
      </div>
    </AnimateLayout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 6
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
