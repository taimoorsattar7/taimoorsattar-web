import { defineType, defineField } from 'sanity'
import { BookIcon } from '@sanity/icons'

export default defineType({
  name: 'content',
  title: 'Lesson Content',
  type: 'document',
  icon: BookIcon,
  preview: {
    select: {
      title: 'title',
      plan: 'plan',
      slug: 'slug.current',
    },
    prepare({ title, plan, slug }: any) {
      return {
        title: title || 'Untitled Lesson',
        subtitle: `${plan ?? 'No plan set'} · /${slug ?? '…'}`,
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Lesson Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used in the /modules/[slug] lesson URL.',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'plan',
      title: 'Access Plan',
      description: 'Controls which subscribers can view this lesson.',
      type: 'string',
      options: {
        list: [
          { title: '🆓 Free', value: 'Free' },
          { title: '⭐ Premium', value: 'Premium' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'body',
      title: 'Lesson Body',
      description: 'The main lesson content — supports text, images, and code blocks.',
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
        {
          type: 'code',
          title: 'Code Snippet',
        },
      ],
    }),
    defineField({
      name: 'doc',
      title: 'Related Document',
      description: 'Optional reference to another lesson (legacy field).',
      type: 'reference',
      to: [{ type: 'content' }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      description: 'Optional SEO metadata for this lesson page.',
      type: 'seo',
    }),
  ],
})
