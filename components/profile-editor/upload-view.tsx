import React, { useRef } from 'react'
import { Upload, Sparkles, Image as ImageIcon, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface UploadViewProps {
  onUpload: (file: File) => void
}

export function UploadView({ onUpload }: UploadViewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onUpload(e.target.files[0])
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files?.[0]) {
      onUpload(e.dataTransfer.files[0])
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] w-full max-w-4xl mx-auto animate-in fade-in duration-700">
        <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                <span>AI Background Removal Included</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground">
                Create your perfect<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">profile picture.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Upload a photo, and we'll automatically remove the background. Customize with gradients, outlines, and filters in seconds.
            </p>
        </div>

        <div 
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation() }}
            className="w-full max-w-md"
        >
            <div 
                onClick={() => fileInputRef.current?.click()}
                className="group relative cursor-pointer"
            >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
                
                <div className="relative h-64 bg-card border border-border hover:border-primary/50 rounded-2xl flex flex-col items-center justify-center p-8 space-y-6 transition-all duration-300 shadow-sm">
                    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                         <Upload className="w-8 h-8 text-primary" />
                    </div>
                    
                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-semibold text-foreground">
                            Upload your photo
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Drag & drop or click to browse
                        </p>
                    </div>
                </div>
            </div>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
            
            <div className="mt-6 text-center">
                 <button 
                    onClick={async () => {
                        try {
                            const response = await fetch('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80');
                            const blob = await response.blob();
                            const file = new File([blob], "demo-portrait.jpg", { type: "image/jpeg" });
                             onUpload(file);
                        } catch (e) {
                            console.error("Failed to load demo", e);
                        }
                    }}
                    className="text-sm text-primary hover:underline font-medium"
                 >
                     No photo? Try with a demo image
                 </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 text-center text-xs text-muted-foreground">
                 <div className="flex flex-col items-center gap-2">
                     <Wand2 className="w-4 h-4" />
                     <span>Auto Remove BG</span>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                     <ImageIcon className="w-4 h-4" />
                     <span>Pro Filters</span>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                     <Sparkles className="w-4 h-4" />
                     <span>Sticker Effects</span>
                 </div>
            </div>
        </div>
    </div>
  )
}
