import { defineType, defineField } from 'sanity'
import { TagIcon } from '@sanity/icons'

export default defineType({
  name: 'price',
  title: 'Price Plan',
  type: 'document',
  icon: TagIcon,
  preview: {
    select: {
      title: 'title',
      product: 'product.title',
    },
    prepare({ title, product }: any) {
      return {
        title: title || 'Untitled Plan',
        subtitle: product ? `Product: ${product}` : 'No product linked',
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Plan Title',
      type: 'string',
      description: 'Internal name for this pricing document (e.g. "Build a Standout Website Pricing").',
    }),
    defineField({
      name: 'product',
      title: 'Product',
      description: 'The product this price plan belongs to.',
      type: 'reference',
      to: [{ type: 'product' }],
    }),
    defineField({
      name: 'content',
      title: 'Associated Module',
      description: 'The course module subscribers get access to.',
      type: 'reference',
      to: [{ type: 'modules' }],
    }),
    defineField({
      name: 'plans',
      title: 'Subscription Tiers',
      description: 'Define each pricing tier (e.g. Free, Premium).',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'plan',
          title: 'Tier',
          preview: {
            select: { title: 'keyword', subtitle: 'price' },
            prepare({ title, subtitle }: any) {
              return {
                title: title || 'Untitled Tier',
                subtitle: subtitle !== undefined ? `$${subtitle}` : 'No price set',
              }
            },
          },
          fields: [
            defineField({ name: 'keyword', title: 'Tier Name', description: 'e.g. Basic, Premium', type: 'string' }),
            defineField({ name: 'price', title: 'Price (USD)', type: 'number' }),
            defineField({ name: 'currency', title: 'Currency Label', description: 'e.g. "/ month" or "one-time"', type: 'string' }),
            defineField({ name: 'source', title: 'Payment Processor', description: 'e.g. Stripe', type: 'string' }),
            defineField({
              name: 'priceID',
              title: 'Stripe Live Price ID',
              type: 'string',
              description: '⚡ Auto-populated by the Stripe sync. Do NOT edit manually — change the Price (USD) field above and trigger a sync via POST /api/sanity-stripe-sync.',
              readOnly: true,
            }),
            defineField({
              name: 'priceID_test',
              title: 'Stripe Test Price ID',
              type: 'string',
              description: '⚡ Auto-populated by the Stripe sync (test mode). Do NOT edit manually.',
              readOnly: true,
            }),
            defineField({
              name: 'description',
              title: 'Tier Description',
              description: 'What the subscriber gets with this tier.',
              type: 'array',
              of: [{ type: 'block' }],
            }),
          ],
        },
      ],
    }),
  ],
})
