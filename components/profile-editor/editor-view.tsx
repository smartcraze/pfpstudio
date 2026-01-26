import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { BackgroundPreset, ShapeType, ImageFilterState, OutlineState, GradientState } from './types'
import { EditorControls } from './editor-controls'
import { EditorPreview } from './editor-preview'

interface EditorViewProps {
  processedImage: string | null
  shape: ShapeType
  background: BackgroundPreset
  setBackground: (bg: BackgroundPreset) => void
  onBack: () => void
  zoom: number; setZoom: (v: number) => void
  rotation: number; setRotation: (v: number) => void
  positionX: number; setPositionX: (v: number) => void
  positionY: number; setPositionY: (v: number) => void
  exportSize: number; setExportSize: (v: number) => void
  
  borderColor: string; setBorderColor: (v: string) => void
  borderWidth: number; setBorderWidth: (v: number) => void
  shadowIntensity: number; setShadowIntensity: (v: number) => void

  filters: ImageFilterState; setFilters: (v: ImageFilterState) => void
  outline: OutlineState; setOutline: (v: OutlineState) => void
  gradient: GradientState; setGradient: (v: GradientState) => void
  noiseTexture: boolean; setNoiseTexture: (v: boolean) => void
}

export function EditorView(props: EditorViewProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-300">
        <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={props.onBack} className="gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Gallery
            </Button>
            <h1 className="text-xl font-bold">Fine-tune your profile</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
            <EditorPreview 
                processedImage={props.processedImage}
                shape={props.shape}
                background={props.background}
                zoom={props.zoom}
                rotation={props.rotation}
                positionX={props.positionX}
                positionY={props.positionY}
                exportSize={props.exportSize}
                borderColor={props.borderColor}
                borderWidth={props.borderWidth}
                shadowIntensity={props.shadowIntensity}
                filters={props.filters}
                outline={props.outline}
                gradient={props.gradient}
                noiseTexture={props.noiseTexture}
            />

            <div className="space-y-8">
                <EditorControls 
                    zoom={props.zoom} setZoom={props.setZoom}
                    rotation={props.rotation} setRotation={props.setRotation}
                    positionX={props.positionX} setPositionX={props.setPositionX}
                    positionY={props.positionY} setPositionY={props.setPositionY}
                    exportSize={props.exportSize} setExportSize={props.setExportSize}
                    borderColor={props.borderColor} setBorderColor={props.setBorderColor}
                    borderWidth={props.borderWidth} setBorderWidth={props.setBorderWidth}
                    shadowIntensity={props.shadowIntensity} setShadowIntensity={props.setShadowIntensity}
                    background={props.background} setBackground={props.setBackground}
                    filters={props.filters} setFilters={props.setFilters}
                    outline={props.outline} setOutline={props.setOutline}
                    gradient={props.gradient} setGradient={props.setGradient}
                    noiseTexture={props.noiseTexture} setNoiseTexture={props.setNoiseTexture}
                />
            </div>
        </div>
    </div>
  )
}
