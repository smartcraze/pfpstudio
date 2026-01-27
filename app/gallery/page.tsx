import type { Metadata } from 'next'
import GalleryPageClient from '@/components/gallery-page'

export const metadata: Metadata = {
  title: 'Choose Background',
  description: 'Select from our curated collection of professional backgrounds, gradients, and patterns.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function Page() {
  return <GalleryPageClient />
}
