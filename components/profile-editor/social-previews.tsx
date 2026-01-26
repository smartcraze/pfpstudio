import React, { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { BackgroundPreset, ShapeType, ImageFilterState, OutlineState, GradientState } from './types'
import { drawProfileImage } from '@/lib/canvas-utils'
import { cn } from '@/lib/utils'

interface SocialPreviewsProps {
  processedImage: string | null
  shape: ShapeType
  background: BackgroundPreset
  gradient: GradientState
  zoom: number
  rotation: number
  positionX: number
  positionY: number
  borderColor: string
  borderWidth: number
  shadowIntensity: number
  filters: ImageFilterState
  outline: OutlineState
  noiseTexture: boolean
}

export function SocialPreviews(props: SocialPreviewsProps) {
    // We'll use one shared image object to prevent reloading
    const imageRef = useRef<HTMLImageElement | null>(null)
    
    // Canvas Refs
    const linkedInRef = useRef<HTMLCanvasElement>(null)
    const twitterRef = useRef<HTMLCanvasElement>(null)
    const instagramRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!props.processedImage) return

        const draw = () => {
             const commonProps = {
                image: imageRef.current!,
                shape: props.shape,
                background: props.background,
                gradient: props.gradient,
                filters: props.filters,
                outline: props.outline,
                noiseTexture: props.noiseTexture,
                zoom: props.zoom,
                rotation: props.rotation,
                positionX: props.positionX,
                positionY: props.positionY,
                borderColor: props.borderColor,
                borderWidth: props.borderWidth,
                shadowIntensity: props.shadowIntensity
            }

            if (linkedInRef.current) {
                drawProfileImage({ ...commonProps, canvas: linkedInRef.current, size: 120 })
            }
            if (twitterRef.current) {
                drawProfileImage({ ...commonProps, canvas: twitterRef.current, size: 100 })
            }
             if (instagramRef.current) {
                drawProfileImage({ ...commonProps, canvas: instagramRef.current, size: 100 })
            }
        }

        if (!imageRef.current || imageRef.current.src !== props.processedImage) {
            const img = new Image()
            img.crossOrigin = 'anonymous'
            img.src = props.processedImage
            img.onload = () => {
                imageRef.current = img
                draw()
            }
        } else {
            draw()
        }
    }, [props])

  return (
    <div className="space-y-6 pt-6 border-t">
        <h3 className="text-lg font-semibold">Social Previews</h3>
        <div className="grid gap-6">
            {/* LinkedIn */}
            <Card className="p-4 space-y-3 bg-white border-zinc-200 overflow-hidden">
                <div className="text-xs font-semibold text-zinc-500 mb-2">LinkedIn</div>
                <div className="relative bg-[#f3f2ef] rounded-lg p-4 h-32">
                    <div className="absolute top-0 left-0 right-0 h-12 bg-[#a0b4b7]" />
                    <div className="relative mt-2 flex gap-3">
                         <div className="shrink-0 relative">
                             <canvas ref={linkedInRef} width={120} height={120} className="w-20 h-20 rounded-full border-2 border-white shadow-sm" style={{borderRadius: props.shape === 'square' ? '4px' : '50%'}} />
                         </div>
                         <div className="pt-10 space-y-1">
                             <div className="w-24 h-3 bg-zinc-800/10 rounded" />
                             <div className="w-32 h-2 bg-zinc-800/5 rounded" />
                         </div>
                    </div>
                </div>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
                {/* Twitter / X */}
                <Card className="p-4 space-y-3 bg-white border-zinc-200">
                    <div className="text-xs font-semibold text-zinc-500 mb-2">X / Twitter</div>
                    <div className="relative bg-white border rounded-lg overflow-hidden">
                        <div className="h-10 bg-zinc-200" />
                        <div className="px-3 pb-3 relative">
                            <div className="absolute -top-6 left-3">
                                <canvas ref={twitterRef} width={100} height={100} className="w-12 h-12 rounded-full border-2 border-white bg-white" />
                            </div>
                            <div className="pt-8 space-y-1">
                                <div className="w-16 h-3 bg-zinc-800/10 rounded" />
                                <div className="w-12 h-2 bg-zinc-800/5 rounded" />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Instagram */}
                <Card className="p-4 space-y-3 bg-white border-zinc-200">
                    <div className="text-xs font-semibold text-zinc-500 mb-2">Instagram</div>
                    <div className="flex flex-col items-center gap-2 py-2">
                        <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
                            <div className="p-[2px] bg-white rounded-full">
                                <canvas ref={instagramRef} width={100} height={100} className="w-16 h-16 rounded-full bg-zinc-100 block" />
                            </div>
                        </div>
                        <div className="w-16 h-2 bg-zinc-800/10 rounded" />
                    </div>
                </Card>
            </div>
        </div>
    </div>
  )
}
