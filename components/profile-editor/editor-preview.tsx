import React, { useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { BackgroundPreset, ShapeType, ImageFilterState, OutlineState, GradientState } from './types'
import { PRESET_BACKGROUNDS, DECALS } from './constants'
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
    
    const draw = async () => {
        if (!canvasRef.current) return

        // Load Main Image
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = processedImage
        await new Promise((resolve) => { img.onload = resolve })

        // Load Background Image if needed
        let bgImg: HTMLImageElement | undefined
        if (background.type === 'image') {
            const bg = new Image()
            bg.crossOrigin = 'anonymous'
            bg.src = background.value
            await new Promise((resolve) => { bg.onload = resolve })
            bgImg = bg
        }

        // Load Decal Image if needed
        let decalImg: HTMLImageElement | undefined
        // Helper to find decal url
        const decalId = background.decal || 'none'
        const decalDef = DECALS.find(d => d.id === decalId)
        if (decalId !== 'none' && decalDef) {
             const d = new Image()
             d.crossOrigin = 'anonymous'
             d.src = decalDef.url
             await new Promise((resolve) => { d.onload = resolve; d.onerror = resolve })
             decalImg = d
        }

        drawProfileImage({
            canvas: canvasRef.current,
            image: img,
            backgroundImage: bgImg,
            decalImage: decalImg,
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

    draw()
  }, [processedImage, shape, background, gradient, filters, outline, noiseTexture, zoom, rotation, positionX, positionY, borderColor, borderWidth, shadowIntensity])

  const handleDownload = async () => {
    if (!processedImage) return
    
    const canvas = document.createElement('canvas')
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = processedImage
    await new Promise((resolve) => { img.onload = resolve })

    let bgImg: HTMLImageElement | undefined
    if (background.type === 'image') {
        const bg = new Image()
        bg.crossOrigin = 'anonymous'
        bg.src = background.value
        await new Promise((resolve) => { bg.onload = resolve })
        bgImg = bg
    }
    
    // Load Decal for Export
    let decalImg: HTMLImageElement | undefined
    const decalId = background.decal || 'none'
    const decalDef = DECALS.find(d => d.id === decalId)
    if (decalId !== 'none' && decalDef) {
         const d = new Image()
         d.crossOrigin = 'anonymous'
         d.src = decalDef.url
         await new Promise((resolve) => { d.onload = resolve; d.onerror = resolve })
         decalImg = d
    }

    drawProfileImage({
        canvas,
        image: img,
        backgroundImage: bgImg,
        decalImage: decalImg,
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
