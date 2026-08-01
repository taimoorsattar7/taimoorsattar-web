import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
    prepare({ title, media }: any) {
      return {
        title: title || 'Unnamed Author',
        subtitle: 'Instructor / Author',
        media,
      }
    },
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Profile Photo',
      description: 'Displayed on the product page author section.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Bio',
      description: 'Short biography shown below the course curriculum.',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})
