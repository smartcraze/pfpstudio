'use client'

import React, { useState, useCallback } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { getCroppedImg } from '@/lib/canvas-utils'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Check, X, RotateCw, ZoomIn } from 'lucide-react'

interface CropViewProps {
  imageSrc: string
  onCancel: () => void
  onCropComplete: (file: File) => void
}

export function CropView({ imageSrc, onCancel, onCropComplete }: CropViewProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  
  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop)
  }

  const onCropCompleteCallback = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const createCroppedImage = async () => {
    if (!croppedAreaPixels) return
    
    try {
      const croppedFile = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      )
      
      if (croppedFile) {
        onCropComplete(croppedFile)
      }
    } catch (e) {
      console.error(e)
    }
  }

  // Force minimum zoom to cover the area if user zooms out too much (cover vs contain behavior)
  // react-easy-crop defaults to 'contain' within the container, but we want 1:1 square.
  
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-card w-full max-w-2xl rounded-xl border shadow-2xl overflow-hidden flex flex-col h-[80vh]">
            <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold text-lg">Crop Image</h3>
                <Button variant="ghost" size="icon" onClick={onCancel}>
                    <X className="w-4 h-4" />
                </Button>
            </div>
            
            <div className="flex-1 relative bg-black/50 overflow-hidden">
                 <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={1}
                    onCropChange={onCropChange}
                    onCropComplete={onCropCompleteCallback}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    classes={{
                        containerClassName: 'relative h-full w-full',
                    }}
                 />
            </div>
            
            <div className="p-6 space-y-6 bg-card border-t">
                 <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <ZoomIn className="w-4 h-4 text-muted-foreground" />
                        <Slider 
                            value={[zoom]} 
                            min={1} 
                            max={3} 
                            step={0.1} 
                            onValueChange={([v]) => setZoom(v)}
                            className="flex-1"
                        />
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <RotateCw className="w-4 h-4 text-muted-foreground" />
                        <Slider 
                            value={[rotation]} 
                            min={0} 
                            max={360} 
                            step={1} 
                            onValueChange={([v]) => setRotation(v)}
                            className="flex-1"
                        />
                    </div>
                 </div>
                 
                 <div className="flex gap-3">
                     <Button variant="outline" className="flex-1" onClick={onCancel}>
                         Cancel
                     </Button>
                     <Button className="flex-1 gap-2" onClick={createCroppedImage}>
                         <Check className="w-4 h-4" />
                         Confirm & Process
                     </Button>
                 </div>
            </div>
        </div>
    </div>
  )
}
