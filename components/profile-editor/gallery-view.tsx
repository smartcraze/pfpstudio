import React, { useRef, useEffect } from 'react'
import { PRESET_BACKGROUNDS, DECALS } from './constants'
import { BackgroundPreset, ShapeType } from './types'
import { cn } from '@/lib/utils'
import { drawProfileImage } from '@/lib/canvas-utils'

interface GalleryViewProps {
  processedImage: string | null
  shape: ShapeType
  setShape: (s: ShapeType) => void
  onSelectBackground: (bg: BackgroundPreset) => void
}

// Mini Component to Render Preview on Canvas
const GalleryItem = ({ bg, processedImage, shape }: { bg: BackgroundPreset, processedImage: string | null, shape: ShapeType }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!processedImage || !canvasRef.current) return
        
        const draw = async () => {
            const canvas = canvasRef.current
            if (!canvas) return
            
            // Re-creating minimal draw logic or reusing drawProfileImage
            // We need to load assets if they exist (bg image, decal)
            
            const img = new Image()
            img.crossOrigin = 'anonymous'
            img.src = processedImage
            await new Promise((resolve) => { img.onload = resolve })

            let bgImg: HTMLImageElement | undefined
            if (bg.type === 'image') {
                const b = new Image()
                b.crossOrigin = 'anonymous'
                b.src = bg.value
                await new Promise((resolve) => { b.onload = resolve; b.onerror = resolve })
                if (b.complete && b.naturalWidth > 0) bgImg = b
            }

            let decalImg: HTMLImageElement | undefined
            if (bg.decal && bg.decal !== 'none') {
                 const decalDef = DECALS.find(d => d.id === bg.decal)
                 if (decalDef) {
                     const d = new Image()
                     d.crossOrigin = 'anonymous'
                     d.src = decalDef.url
                     await new Promise((resolve) => { d.onload = resolve; d.onerror = resolve })
                     if (d.complete && d.naturalWidth > 0) decalImg = d
                 }
            }

            drawProfileImage({
                canvas,
                image: img,
                backgroundImage: bgImg,
                decalImage: decalImg,
                shape: shape,
                background: bg,
                gradient: { enabled: false, color1: '#000', color2: '#000', angle: 0 },
                filters: { brightness: 100, contrast: 100, saturation: 100, grayscale: 0 },
                outline: { color: '#fff', width: 0 },
                zoom: 100,
                rotation: 0,
                positionX: 50, // Center
                positionY: 50, // Center
                size: 200,     // Thumbnail size
                borderColor: '#fff',
                borderWidth: 0,
                shadowIntensity: 0,
                noiseTexture: false 
            })
        }
        draw()
    }, [bg, processedImage, shape])

    return <canvas ref={canvasRef} width={200} height={200} className="w-full h-full object-contain" />
}

export function GalleryView({ processedImage, shape, setShape, onSelectBackground }: GalleryViewProps) {
  
  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Pick your perfect look</h1>
            <p className="text-muted-foreground">We've removed the background. Now select a style to customize.</p>
            
            <div className="inline-flex bg-muted p-1 rounded-lg border">
                {(['circle', 'squircle', 'square'] as const).map((s) => (
                    <button 
                        key={s}
                        onClick={() => setShape(s)}
                        className={cn(
                            "px-4 py-2 rounded-md text-sm font-medium transition-all capitalize", 
                            shape === s ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {s === 'squircle' ? 'Rounded' : s}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {PRESET_BACKGROUNDS.map((bg) => (
                <div 
                key={bg.id} 
                className="group cursor-pointer space-y-2"
                onClick={() => onSelectBackground(bg)}
                >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-muted/20  hover:border-primary transition-all duration-300 hover:shadow-lg">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                             <GalleryItem bg={bg} processedImage={processedImage} shape={shape} />
                        </div>
                        
                        <div className="absolute inset-0 bg-transparent group-hover:bg-foreground/5 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 bg-background/90 backdrop-blur text-xs font-semibold px-3 py-1 rounded-full shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-all text-foreground">
                                Customize
                            </div>
                        </div>
                </div>
                <p className="text-center text-xs font-medium text-muted-foreground group-hover:text-foreground">{bg.name}</p>
                </div>
            ))}
        </div>
    </div>
  )
}
