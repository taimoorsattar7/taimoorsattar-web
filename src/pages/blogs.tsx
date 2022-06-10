import React from "react"
import { Link, graphql } from "gatsby"
import SEO from "@components/seo"

import Layout from "@components/layout"

const Blogs = ({ data, location }: any) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location}>
      <SEO
        location={location}
        title={"Blogs - Taimoor Sattar"}
        description={"Blogs - Taimoor Sattar"}
      />

      <section className="m-t-25 m-b-35">
        <div className="wrapper wrapper--narrow">
          <div className="m-b-20">
            <h2 className="headline">Recent Blogs 📝</h2>
          </div>

          <ol style={{ listStyle: `none`, padding: "0" }}>
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
        </div>
      </section>
    </Layout>
  )
}

export default Blogs

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fields: { slug: { regex: "/blogs/" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
        }
        excerpt
        internal {
          content
        }
        fields {
          slug
        }
        id
      }
    }
  }
`
