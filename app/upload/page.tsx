'use client'

import { useState } from 'react'
import { FileUpload } from '@/components/ui/file-upload'
import { ProcessingView } from '@/components/profile-editor/processing-view'
import { CropView } from '@/components/profile-editor/crop-view'
import { useProfile } from '@/lib/profile-context'
import { Navbar } from '@/components/Navbar'
import { cn } from '@/lib/utils'
import { IconPhoto, IconShieldLock, IconSparkles, IconFileTypeJpg, IconFileTypePng, IconFileUpload } from '@tabler/icons-react'
import { motion } from 'framer-motion'

export default function UploadPage() {
  const { processImage, isProcessing } = useProfile()
  const [imageToCrop, setImageToCrop] = useState<string | null>(null)
  
  const handleFileChange = (files: File[]) => {
      if (files.length > 0) {
          const file = files[0];
          const reader = new FileReader()
          reader.onload = (e) => {
              if (reader.result) {
                  setImageToCrop(reader.result.toString())
              }
          }
          reader.readAsDataURL(file)
      }
  }

  const handleCropComplete = (croppedFile: File) => {
    setImageToCrop(null)
    processImage(croppedFile)
  }

  // Shared Background Component
  const GridBackground = () => (
    <div className="fixed inset-0 z-[-1] bg-white dark:bg-black/[0.96] antialiased">
         <div className={cn(
           "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
           "[background-image:linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)]",
           "dark:[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
         )} />
         <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
    </div>
  )

  if (isProcessing) {
     return (
        <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden">
             <GridBackground />
             <Navbar />
             <ProcessingView progress={66} />
        </main>
     )
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
       <Navbar />
       <GridBackground />
       
       {imageToCrop && (
         <CropView 
            imageSrc={imageToCrop} 
            onCancel={() => setImageToCrop(null)}
            onCropComplete={handleCropComplete}
         />
       )}
       
       <div className="container mx-auto px-4 pt-32 pb-20 flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12 max-w-2xl"
            >
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-6 ring-1 ring-primary/20">
                    <IconFileUpload className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Let's Create Your Masterpiece</h1>
                <p className="text-muted-foreground text-lg">Upload your photo to get started. Our AI will automatically remove the background and prepare it for editing.</p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-full max-w-3xl mx-auto relative group"
            >
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                
                <div className="relative bg-card rounded-xl border border-border shadow-2xl overflow-hidden">
                    <FileUpload onChange={handleFileChange} />
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl w-full"
            >
                <div className="flex flex-col items-center text-center p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50">
                    <IconPhoto className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-1">High Quality</h3>
                    <p className="text-sm text-muted-foreground">Support for 4K images</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50">
                    <IconShieldLock className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-1">Secure</h3>
                    <p className="text-sm text-muted-foreground">Processed locally</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50">
                    <IconSparkles className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-1">AI Powered</h3>
                    <p className="text-sm text-muted-foreground">Smart background removal</p>
                </div>
            </motion.div>
       </div>
    </main>
  )
}
