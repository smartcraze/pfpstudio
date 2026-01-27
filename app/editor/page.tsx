import type { Metadata } from 'next'
import EditorPageClient from '@/components/editor-page'

export const metadata: Metadata = {
  title: 'Profile Editor',
  description: 'Customize your profile picture. Adjust borders, add shadows, apply filters, and choose from our library of backgrounds.',
  robots: {
    index: false, // Don't index the editor state itself as it requires upload
    follow: true,
  },
}

export default function Page() {
  return <EditorPageClient />
}
