'use client'

import { useState } from 'react'
import { UploadView } from '@/components/profile-editor/upload-view'
import { ProcessingView } from '@/components/profile-editor/processing-view'
import { CropView } from '@/components/profile-editor/crop-view'
import { useProfile } from '@/lib/profile-context'
import { HeroScrollDemo } from '@/components/HeroScroll'
import { TextHoverEffectDemo } from '@/components/TextHover'

export default function Home() {
  const { processImage, isProcessing } = useProfile()
  const [imageToCrop, setImageToCrop] = useState<string | null>(null)

  const handleUpload = (file: File) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      setImageToCrop(reader.result?.toString() || null)
    })
    reader.readAsDataURL(file)
  }

  const handleCropComplete = (croppedFile: File) => {
    setImageToCrop(null)
    processImage(croppedFile)
  }

  if (isProcessing) {
     return (
        <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
             <ProcessingView progress={66} />
        </main>
     )
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
       {imageToCrop && (
         <CropView 
            imageSrc={imageToCrop} 
            onCancel={() => setImageToCrop(null)}
            onCropComplete={handleCropComplete}
         />
       )}
       
       <div className="container mx-auto py-8 px-4 flex-1 flex flex-col">
         <UploadView onUpload={handleUpload} />
       </div>

       <HeroScrollDemo/>       
       <TextHoverEffectDemo/>
       <footer className="border-t py-6 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Profile Picture AI. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}