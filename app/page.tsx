'use client'

import { UploadView } from '@/components/profile-editor/upload-view'
import { ProcessingView } from '@/components/profile-editor/processing-view'
import { useProfile } from '@/lib/profile-context'

export default function Home() {
  const { processImage, isProcessing } = useProfile()

  if (isProcessing) {
     return (
        <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
             <ProcessingView progress={66} />
        </main>
     )
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
       <div className="container mx-auto py-8 px-4 flex-1 flex flex-col">
         <UploadView onUpload={processImage} />
       </div>
       
       <footer className="border-t py-6 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Profile Picture AI. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}