import { defineType, defineField } from 'sanity'
import { FolderIcon } from '@sanity/icons'

export default defineType({
  name: 'modules',
  title: 'Course Modules',
  type: 'document',
  icon: FolderIcon,
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }: any) {
      return {
        title: title || 'Untitled Module',
        subtitle: slug ? `/${slug}` : 'No slug set',
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Module Title',
      type: 'string',
      description: 'Name of this course module (shown on the curriculum page).',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used in the /modules/[slug] route.',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'body',
      title: 'Module Description',
      description: 'A short overview of what this module covers.',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'docs',
      title: 'Chapters',
      description: 'Ordered list of chapters. Each chapter groups related lessons.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'dochierarchy',
          title: 'Chapter',
          preview: {
            select: { title: 'title' },
          },
          fields: [
            defineField({ name: 'title', title: 'Chapter Title', type: 'string' }),
            defineField({
              name: 'doc',
              title: 'Lessons',
              description: 'Ordered references to Lesson Content documents.',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'content' }] }],
            }),
          ],
        },
      ],
    }),
  ],
})
