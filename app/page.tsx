'use client'

import ProfileEditor from '@/components/profile-editor'
import { useState } from 'react'

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleImageUpload = (file: File) => {
    setUploadedFile(file)
    console.log('Image uploaded:', file.name)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-8">
        <ProfileEditor onImageUpload={handleImageUpload} />
      </div>
    </div>
  )
}