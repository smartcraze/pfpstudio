import React, { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { BackgroundPreset, ShapeType } from './types'
import { cn } from '@/lib/utils'
import { drawProfileImage } from '@/lib/canvas-utils'

interface EditorPreviewProps {
  processedImage: string | null
  shape: ShapeType
  background: BackgroundPreset
  zoom: number
  rotation: number
  positionX: number
  positionY: number
  exportSize: number
  borderColor: string
  borderWidth: number
  shadowIntensity: number
}

export function EditorPreview({
  processedImage,
  shape,
  background,
  zoom,
  rotation,
  positionX,
  positionY,
  exportSize,
  borderColor,
  borderWidth,
  shadowIntensity
}: EditorPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleDownload = () => {
    if (!processedImage || !canvasRef.current) return
    const canvas = canvasRef.current
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
        drawProfileImage({
            canvas,
            image: img,
            shape,
            background,
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
        link.download = `profile-${shape}-${background.id}.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
    }
    img.src = processedImage
  }

  const getBackgroundStyle = () => {
    if (background.value === 'transparent') {
        return {
          backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
          backgroundSize: '8px 8px',
          backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
          backgroundColor: '#ffffff'
        }
    }
    return { background: background.value }
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-2xl border-2 border-dashed border-muted-foreground/10">
        <div 
        className={cn(
            "relative overflow-hidden transition-all duration-300",
            shape === 'circle' && "rounded-full",
            shape === 'square' && "rounded-none",
            shape === 'squircle' && "rounded-[22%]"
        )}
        style={{
            width: 320,
            height: 320,
            ...getBackgroundStyle(),
            // Preview Styles
            border: `${borderWidth}px solid ${borderColor}`,
            boxShadow: shadowIntensity > 0 ? `0 ${shadowIntensity/2}px ${shadowIntensity*2}px rgba(0,0,0,0.5)` : 'none'
        }}
        >
            {processedImage && (
                <img 
                src={processedImage}
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-100 ease-out"
                style={{
                    transform: `translate(${positionX-50}%, ${positionY-50}%) rotate(${rotation}deg) scale(${zoom/100})`,
                    transformOrigin: 'center' 
                }}
                />
            )}
        </div>
        <div className="mt-6 flex gap-4">
            <Button size="lg" onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
                <Download className="w-4 h-4 mr-2" /> Download PNG
            </Button>
        </div>
        <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
