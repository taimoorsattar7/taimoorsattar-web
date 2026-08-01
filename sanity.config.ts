import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { schemaTypes } from './sanity/schemas'
import {
  PackageIcon,
  FolderIcon,
  BookIcon,
  TagIcon,
  UsersIcon,
  UserIcon,
  BillIcon,
  StarIcon,
  SyncIcon,
} from '@sanity/icons'

/**
 * Custom document action: "Sync to Stripe"
 * Appears on Price Plan documents. Calls /api/sanity-stripe-sync with the doc _id
 * which creates/updates Stripe Products & Prices and writes the IDs back to Sanity.
 */
function SyncToStripeAction(props: any) {
  const { id } = props

  return {
    label: 'Sync to Stripe',
    icon: SyncIcon,
    tone: 'primary' as const,
    onHandle: async () => {
      try {
        const res = await fetch('/api/sanity-stripe-sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sanityDocId: id }),
        })

        const data = await res.json()

        if (!res.ok) {
          alert(`Sync failed: ${data?.message || 'Unknown error'}`)
          return
        }

        const synced = (data.synced || []).filter((s: any) => !s.skipped)
        const skipped = (data.synced || []).filter((s: any) => s.skipped)

        alert(
          `✅ Synced ${synced.length} plan(s) to Stripe!` +
          (skipped.length ? `\n${skipped.length} free plan(s) skipped.` : '') +
          '\n\nRefresh the document to see updated Stripe Price IDs.'
        )
      } catch (err: any) {
        alert(`Sync error: ${err?.message || String(err)}`)
      }
    },
  }
}

const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      // ── Course Content ────────────────────────────────────────────
      S.listItem()
        .title('Course Content')
        .icon(FolderIcon)
        .child(
          S.list()
            .title('Course Content')
            .items([
              S.listItem()
                .title('Products')
                .icon(PackageIcon)
                .child(S.documentTypeList('product').title('Products')),
              S.listItem()
                .title('Modules')
                .icon(FolderIcon)
                .child(S.documentTypeList('modules').title('Modules')),
              S.listItem()
                .title('Lessons')
                .icon(BookIcon)
                .child(S.documentTypeList('content').title('Lessons')),
            ])
        ),

      S.divider(),

      // ── Commerce ─────────────────────────────────────────────────
      S.listItem()
        .title('Commerce')
        .icon(TagIcon)
        .child(
          S.list()
            .title('Commerce')
            .items([
              S.listItem()
                .title('Price Plans')
                .icon(TagIcon)
                .child(S.documentTypeList('price').title('Price Plans')),
              S.listItem()
                .title('Subscriptions')
                .icon(BillIcon)
                .child(S.documentTypeList('subscriptions').title('Subscriptions')),
            ])
        ),

      S.divider(),

      // ── People ───────────────────────────────────────────────────
      S.listItem()
        .title('People')
        .icon(UsersIcon)
        .child(
          S.list()
            .title('People')
            .items([
              S.listItem()
                .title('Authors')
                .icon(UserIcon)
                .child(S.documentTypeList('author').title('Authors')),
              S.listItem()
                .title('Customers')
                .icon(UsersIcon)
                .child(S.documentTypeList('customer').title('Customers')),
              S.listItem()
                .title('Testimonials')
                .icon(StarIcon)
                .child(S.documentTypeList('testimonial').title('Testimonials')),
            ])
        ),
    ])

export default defineConfig({
  name: 'default',
  title: process.env.NEXT_PUBLIC_SANITY_PROJECT_NAME || process.env.SANITY_PROJECT_NAME || 'taimoorsattar.dev',
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.GATSBY_SANITY_PROJECT_ID || '7p4bxs1b',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.GATSBY_SANITY_DATASET || 'production',

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Add the "Sync to Stripe" action to Price Plan documents
    actions: (prev: any[], context: any) => {
      if (context.schemaType === 'price') {
        return [SyncToStripeAction, ...prev]
      }
      return prev
    },
  },
})
