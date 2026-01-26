import React, { useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { BackgroundPreset, ShapeType, ImageFilterState, OutlineState, GradientState } from './types'
import { cn } from '@/lib/utils'
import { drawProfileImage } from '@/lib/canvas-utils'

interface EditorPreviewProps {
  processedImage: string | null
  shape: ShapeType
  background: BackgroundPreset
  gradient: GradientState
  zoom: number
  rotation: number
  positionX: number
  positionY: number
  exportSize: number
  borderColor: string
  borderWidth: number
  shadowIntensity: number
  filters: ImageFilterState
  outline: OutlineState
  noiseTexture: boolean
}

export function EditorPreview({
  processedImage,
  shape,
  background,
  gradient,
  zoom,
  rotation,
  positionX,
  positionY,
  exportSize,
  borderColor,
  borderWidth,
  shadowIntensity,
  filters,
  outline,
  noiseTexture
}: EditorPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!processedImage || !canvasRef.current) return
    
    // Create new image object to ensure fresh load
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = processedImage
    
    // Only draw once image is loaded
    img.onload = () => {
        if (!canvasRef.current) return
        drawProfileImage({
            canvas: canvasRef.current,
            image: img,
            shape,
            background,
            gradient,
            filters,
            outline,
            noiseTexture,
            zoom,
            rotation,
            positionX,
            positionY,
            size: 320,
            borderColor,
            borderWidth,
            shadowIntensity
        })
    }
  }, [processedImage, shape, background, gradient, filters, outline, noiseTexture, zoom, rotation, positionX, positionY, borderColor, borderWidth, shadowIntensity])

  const handleDownload = () => {
    if (!processedImage) return
    
    const canvas = document.createElement('canvas')
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = processedImage
    
    img.onload = () => {
        drawProfileImage({
            canvas,
            image: img,
            shape,
            background,
            gradient,
            filters,
            outline,
            noiseTexture,
            zoom,
            rotation,
            positionX,
            positionY,
            size: exportSize,
            borderColor,
            borderWidth,
            shadowIntensity
        })
        const link = document.createElement('a')
        link.download = `pfp-maker-${Date.now()}.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-2xl border-2 border-dashed border-muted-foreground/10">
        <div className="relative shadow-2xl rounded-xl overflow-hidden">
            <canvas 
                ref={canvasRef}
                width={320}
                height={320}
                className="block"
            />
        </div>
        <div className="mt-6 flex gap-4">
            <Button size="lg" onClick={handleDownload} className="shadow-lg shadow-primary/20">
                <Download className="w-4 h-4 mr-2" /> Download {exportSize}px PNG
            </Button>
        </div>
    </div>
  )
}
