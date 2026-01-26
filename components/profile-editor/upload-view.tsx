import React, { useRef } from 'react'
import { Upload } from 'lucide-react'

interface UploadViewProps {
  onUpload: (file: File) => void
}

export function UploadView({ onUpload }: UploadViewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files?.[0]) {
      onUpload(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center animate-in fade-in duration-500">
        <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                Profile Pic <span className="text-blue-600">Perfect</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Drop your image anywhere. We'll automatically remove the background and give you professional styles instantly.
            </p>
        </div>

        <div 
            ref={dropZoneRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="w-full max-w-2xl group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
        >
            <div className="border-4 border-dashed border-muted-foreground/20 rounded-3xl p-12 bg-muted/5 transition-all duration-300 group-hover:border-blue-500/50 group-hover:bg-blue-50/50 group-hover:scale-[1.01]">
                <div className="flex flex-col items-center justify-center space-y-6 text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                         <Upload className="w-10 h-10 text-blue-600" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Drop your image here
                        </h3>
                        <p className="text-muted-foreground">
                            or click to browse • Ctrl+V to paste
                        </p>
                    </div>
                    <div className="text-xs text-muted-foreground/50 pt-4">
                        Supports PNG, JPG, WEBP up to 5MB
                    </div>
                </div>
            </div>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                    if (e.target.files?.[0]) onUpload(e.target.files[0])
                }}
                className="hidden"
            />
        </div>
    </div>
  )
}
