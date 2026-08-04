import { defineType, defineField } from 'sanity'
import { PackageIcon } from '@sanity/icons'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PackageIcon,
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'bgimage',
    },
    prepare({ title, subtitle, media }: any) {
      return {
        title: title || 'Untitled Product',
        subtitle: subtitle ? `Category: ${subtitle}` : 'Course Product',
        media,
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      description: 'The public-facing name of this course or product.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-safe identifier — used in the /p/[slug] route.',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. course, book, workshop',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'bgimage',
      title: 'Hero / Background Image',
      type: 'image',
      description: 'Displayed as the product banner background.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bookImage',
      title: 'Book Cover Image',
      type: 'image',
      description: 'Used for book-style products.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'mainvideo',
      title: 'Intro Video',
      type: 'object',
      description: 'Preview video shown on the product page banner.',
      fields: [
        defineField({ name: 'asset', title: 'Video File', type: 'file' }),
        defineField({ name: 'image', title: 'Poster / Thumbnail', type: 'image' }),
        defineField({ name: 'description', title: 'Video Description', type: 'string' }),
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      description: 'The instructor or author of this product.',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'productPrice',
      title: 'Price Plan',
      type: 'reference',
      description: 'Links to the Price document that defines subscription tiers.',
      to: [{ type: 'price' }],
    }),
    defineField({
      name: 'short',
      title: 'Short Description',
      description: 'Displayed in the product banner below the title.',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          name: 'mainImage',
          title: 'Image',
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Detailed Description',
      description: 'Full product description rendered below the tech stack logos.',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          name: 'mainImage',
          title: 'Image',
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'techs',
      title: 'Technologies',
      description: 'Logos shown in the tech stack strip on the product page.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'tech',
          title: 'Technology',
          preview: {
            select: { title: 'name', media: 'logo' },
          },
          fields: [
            defineField({ name: 'name', title: 'Technology Name', type: 'string' }),
            defineField({ name: 'logo', title: 'Logo', type: 'image' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'curriculum',
      title: 'Curriculum',
      description: 'Chapter-by-chapter overview (legacy field — use Modules for live content).',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'chapter',
          title: 'Chapter',
          preview: {
            select: { title: 'title' },
          },
          fields: [
            defineField({ name: 'title', title: 'Chapter Title', type: 'string' }),
            defineField({
              name: 'body',
              title: 'Chapter Description',
              type: 'array',
              of: [{ type: 'block' }],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faq',
          title: 'FAQ',
          preview: {
            select: { title: 'question' },
          },
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'array',
              of: [{ type: 'block' }],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      description: 'References to Testimonial documents.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      description: 'Contact or notification email associated with this product.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      description: 'Search engine and social sharing metadata.',
      type: 'seo',
    }),
  ],
})
