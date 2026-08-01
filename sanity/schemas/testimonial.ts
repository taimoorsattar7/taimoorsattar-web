import { defineType, defineField } from 'sanity'
import { StarIcon } from '@sanity/icons'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: StarIcon,
  preview: {
    select: {
      title: 'name',
      subtitle: 'profession',
      media: 'avatar',
    },
    prepare({ title, subtitle, media }: any) {
      return {
        title: title || 'Anonymous',
        subtitle: subtitle || 'No role set',
        media,
      }
    },
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'profession',
      title: 'Profession / Role',
      description: 'e.g. Frontend Engineer, Freelancer',
      type: 'string',
    }),
    defineField({
      name: 'avatar',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'message',
      title: 'Testimonial',
      description: 'What this person said about the course.',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})
