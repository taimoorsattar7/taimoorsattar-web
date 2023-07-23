import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import AnimateLayout from "@components/AnimateLayout"
import SEO from "@components/seo"
// import SiteBanner from "@components/site-banner"
import Bio from "@components/bio/index"

import SubstackEmbed from "@components/substack-embed/index"

import BlogList from "@components/blog-list/index"
import Button from "@atom/button/index"

const BlogIndex: React.FC<PageProps<any>> = ({ data, location }) => {
  const posts = data.allMarkdownRemark.nodes

  const avatar = data.avatar?.childImageSharp?.fixed

  if (posts.length === 0) {
    return (
      <AnimateLayout location={location}>
        <SEO
          location={location}
          title="Taimoor Sattar"
          description="My name is Taimoor Sattar and I'm a full-stack developer and
          educator. I've been building websites for quite a long time. I
          have experience building modern websites with Gatsby/Next.js,
          Node.js, and MongoDB/Sanity/harperdb."
        />

        {/* <SiteBanner /> */}
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </AnimateLayout>
    )
  }

  return (
    <AnimateLayout location={location}>
      <SEO
        title="Taimoor Sattar - Full-stack developer"
        description="My name is Taimoor Sattar, a full-stack developer. I have a bachelor's degree in engineering, but love to code."
        image={avatar?.src ?? ""}
        location={location}
      />

      <div className="wrapper wrapper--narrow p-b-50">
        {/* <SiteBanner /> */}
        <Bio />

        <BlogList posts={posts}>
          <header className="mb-6">
            <h2 className="text-3xl mb-1 text-center sm:text-left">
              <b>Feature Blogs</b>
            </h2>
            <Link
              className="block text-base mb-1 text-center sm:text-left"
              to="/blogs/"
            >
              <b>View all blogs &#8594;</b>
            </Link>
          </header>
        </BlogList>
        
        <section className="mt-8 mb-8 text-center">
          <SubstackEmbed className="max-w-full" />
        </section>

        <section className="w-full flex flex-col items-center justify-center gap-2 text-center mt-6 mb-14">
          <h2 className="max-w-3xl text-5xl [background:linear-gradient(110.8deg,_#000,_#4d4d4d_66.67%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
            <b>Learn to build the Your Next Project.</b>
          </h2>
          <Link className="no-underline" to="/contact">
            <Button
              btnSize="large"
              btnTheme="outline"
              iconRight={"send"}
              textValue="Send Message"
            />
          </Link>
        </section>
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

    allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 6) {
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
