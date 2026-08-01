import { defineType, defineField } from 'sanity'
import { BillIcon } from '@sanity/icons'

export default defineType({
  name: 'subscriptions',
  title: 'Subscriptions',
  type: 'document',
  icon: BillIcon,
  preview: {
    select: {
      title: 'title',
      status: 'status',
      email: 'email',
      plankey: 'plankey',
    },
    prepare({ title, status, email, plankey }: any) {
      const statusEmoji =
        status === 'active' ? '🟢' : status === 'canceled' ? '🔴' : '🟡'
      return {
        title: email || title || 'Unknown Subscriber',
        subtitle: `${statusEmoji} ${status ?? 'unknown'} · ${plankey ?? 'no plan'}`,
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Subscription Title',
      description: 'Internal label for this subscription record.',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Customer Email',
      description: 'Stored directly for quick reference.',
      type: 'string',
    }),
    defineField({
      name: 'subID',
      title: 'Stripe Subscription ID',
      description: 'The sub_* ID from Stripe.',
      type: 'string',
    }),
    defineField({
      name: 'customer',
      title: 'Customer',
      description: 'Reference to the Customer document.',
      type: 'reference',
      to: [{ type: 'customer' }],
    }),
    defineField({
      name: 'price',
      title: 'Price Plan',
      description: 'Reference to the Price document for this subscription.',
      type: 'reference',
      to: [{ type: 'price' }],
    }),
    defineField({
      name: 'plankey',
      title: 'Plan Key',
      description: 'e.g. Premium, Basic — used for access control.',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      description: 'Current Stripe subscription status.',
      type: 'string',
      options: {
        list: [
          { title: '🟢 Active', value: 'active' },
          { title: '🔴 Canceled', value: 'canceled' },
          { title: '🟡 Past Due', value: 'past_due' },
          { title: '⏸️ Paused', value: 'paused' },
          { title: '🔁 Trialing', value: 'trialing' },
        ],
      },
    }),
    defineField({
      name: 'start_date',
      title: 'Start Date',
      type: 'string',
    }),
    defineField({
      name: 'cancel_at',
      title: 'Cancel At',
      description: 'Date when cancellation is scheduled.',
      type: 'string',
    }),
    defineField({
      name: 'canceled_at',
      title: 'Canceled At',
      description: 'Date when subscription was actually canceled.',
      type: 'string',
    }),
    defineField({
      name: 'cancel_at_period_end',
      title: 'Cancel at Period End',
      description: 'If true, subscription stays active until end of billing period.',
      type: 'boolean',
    }),
    defineField({
      name: 'livemode',
      title: 'Live Mode',
      description: 'True = production Stripe; false = test mode.',
      type: 'boolean',
    }),
  ],
})
