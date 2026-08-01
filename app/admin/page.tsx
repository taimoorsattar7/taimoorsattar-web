'use client'

import { useEffect } from 'react'

export default function AdminPage() {
  useEffect(() => {
    // Load Sveltia CMS script if not already added
    if (!document.getElementById('sveltia-cms-script')) {
      const script = document.createElement('script')
      script.id = 'sveltia-cms-script'
      script.src = 'https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js'
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Loading Sveltia CMS...</h1>
        <p className="text-sm text-zinc-400">Please wait while the Content Management System initializes.</p>
      </div>
    </div>
  )
}
