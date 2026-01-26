'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useProfile } from '@/lib/profile-context'
import { GalleryView } from '@/components/profile-editor/gallery-view'

export default function GalleryPage() {
  const router = useRouter()
  const { processedImage, shape, setShape, setSelectedBg } = useProfile()

  useEffect(() => {
    if (!processedImage) {
      router.replace('/')
    }
  }, [processedImage, router])

  if (!processedImage) return null

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col px-4 py-8 md:px-8 md:py-12">
        <GalleryView 
            processedImage={processedImage}
            shape={shape}
            setShape={setShape}
            onSelectBackground={(bg) => {
                setSelectedBg(bg)
                router.push('/editor')
            }}
        />
    </main>
  )
}
