import type { Metadata } from 'next'
import UploadPageClient from '@/components/upload-page'

export const metadata: Metadata = {
  title: 'Upload Profile Picture',
  description: 'Upload your photo to start creating your professional profile picture. Our AI tools ensure your privacy and high-quality results.',
  alternates: {
    canonical: '/upload',
  },
}

export default function Page() {
  return <UploadPageClient />
}
