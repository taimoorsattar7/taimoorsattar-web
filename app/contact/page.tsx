import React from 'react'
import Layout from '@/src/components/layout'

export const metadata = {
  title: 'Contact - Taimoor Sattar',
  description: 'Get in touch with Taimoor Sattar.',
}

export default function ContactPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Contact</h1>
        <div className="w-full">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSeU-WQ1k5uWpgccJYOdwgxESoDbZpPT_pZg624-BOVBwcW0TA/viewform?embedded=true"
            width="100%"
            height="800"
            frameBorder={0}
            marginHeight={0}
            marginWidth={0}
            title="Contact Form"
            style={{ border: 'none' }}
          >
            Loading…
          </iframe>
        </div>
      </div>
    </Layout>
  )
}
