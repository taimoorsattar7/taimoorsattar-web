import { defineType, defineField } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export default defineType({
  name: 'customer',
  title: 'Customer',
  type: 'document',
  icon: UsersIcon,
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
    prepare({ title, subtitle }: any) {
      return {
        title: title || 'Unnamed Customer',
        subtitle: subtitle || 'No email',
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
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'password',
      title: 'Password (Hashed)',
      description: 'Stored as a hashed value — do not edit manually.',
      type: 'string',
    }),
    defineField({
      name: 'cusid',
      title: 'Stripe Customer ID',
      description: 'Auto-populated when the customer completes checkout.',
      type: 'string',
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'seo',
      title: 'SEO Metadata',
      type: 'seo',
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata',
      type: 'object',
      fields: [
        defineField({ name: 'stripeId', title: 'Stripe ID', type: 'string' }),
      ],
    }),
  ],
})
