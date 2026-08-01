import React from 'react'
import './globals.css'
import Providers from '../src/components/Providers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://taimoorsattar.dev'),
  title: {
    default: 'Taimoor Sattar - Full-Stack Software Developer & Educator',
    template: '%s | Taimoor Sattar',
  },
  description:
    'Official website, engineering blog, and full-stack web development courses by Taimoor Sattar. Tutorials on React, Next.js, TypeScript, Sanity CMS, and Jamstack architectures.',
  keywords: [
    'Taimoor Sattar',
    'Full-Stack Developer',
    'Software Engineer',
    'React',
    'Next.js',
    'TypeScript',
    'Sanity CMS',
    'Stripe Checkout',
    'Jamstack',
    'Web Development Courses',
  ],
  authors: [{ name: 'Taimoor Sattar', url: 'https://taimoorsattar.dev' }],
  creator: 'Taimoor Sattar',
  publisher: 'Taimoor Sattar',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://taimoorsattar.dev',
    siteName: 'Taimoor Sattar',
    title: 'Taimoor Sattar - Full-Stack Software Developer & Educator',
    description:
      'Tutorials and full-stack courses on React, Next.js, Sanity CMS, and Web Development by Taimoor Sattar.',
    images: [
      {
        url: 'https://homegear.dev/_next/static/media/taimoor.0f87e767.jpg',
        width: 1200,
        height: 630,
        alt: 'Taimoor Sattar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taimoor Sattar - Full-Stack Developer & Educator',
    description:
      'Tutorials and full-stack courses on React, Next.js, Sanity CMS, and Web Development.',
    creator: '@taimoorsattar7',
    images: ['https://homegear.dev/_next/static/media/taimoor.0f87e767.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-white dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
