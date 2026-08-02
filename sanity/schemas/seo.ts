import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      description: 'Title for search engines and social sharing tags.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Short summary for search result snippets and social previews.',
    }),
    defineField({
      name: 'image',
      title: 'OG Image',
      type: 'image',
      description: 'Social sharing image (OpenGraph / Twitter card).',
      options: { hotspot: true },
    }),
  ],
})
