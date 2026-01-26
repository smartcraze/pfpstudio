'use client'

import React, { useState } from 'react'
import { BackgroundRemovalService } from '@/lib/image-processing'
import { UploadView } from './upload-view'
import { ProcessingView } from './processing-view'
import { GalleryView } from './gallery-view'
import { EditorView } from './editor-view'
import { PRESET_BACKGROUNDS, DEFAULT_FILTERS, DEFAULT_OUTLINE, DEFAULT_GRADIENT } from './constants'
import { BackgroundPreset, ShapeType, ViewState, ImageFilterState, OutlineState, GradientState } from './types'

interface ProfileEditorProps {
  onImageUpload: (file: File) => void
}

export default function ProfileEditor({ onImageUpload }: ProfileEditorProps) {
  // Global View State
  const [view, setView] = useState<ViewState>('upload')
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  
  // Processing State
  const [progress, setProgress] = useState(0)
  
  // Editor State
  const [shape, setShape] = useState<ShapeType>('circle')
  const [selectedBg, setSelectedBg] = useState<BackgroundPreset>(PRESET_BACKGROUNDS[1])
  
  // Transform State
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [positionX, setPositionX] = useState(50)
  const [positionY, setPositionY] = useState(50)
  const [exportSize, setExportSize] = useState(400)

  // Style State
  const [borderColor, setBorderColor] = useState('#ffffff')
  const [borderWidth, setBorderWidth] = useState(0)
  const [shadowIntensity, setShadowIntensity] = useState(0)

  // Advanced State
  const [filters, setFilters] = useState<ImageFilterState>(DEFAULT_FILTERS)
  const [outline, setOutline] = useState<OutlineState>(DEFAULT_OUTLINE)
  const [gradient, setGradient] = useState<GradientState>(DEFAULT_GRADIENT)
  const [noiseTexture, setNoiseTexture] = useState(false)

  const processUpload = async (file: File) => {
    setView('processing')
    setProgress(10)
    onImageUpload(file)

    const reader = new FileReader()
    reader.onload = async (e) => {
      const originalResult = e.target?.result as string
      
      try {
        setProgress(30)
        const formData = new FormData()
        formData.append('image', file)
        
        let removedBgUrl = originalResult 

        try {
           const apiResponse = await fetch('/api/remove-background', {
              method: 'POST',
              body: formData,
           })
           
           if (apiResponse.ok) {
             const result = await apiResponse.json()
             removedBgUrl = result.processedImage
           } else {
             console.warn("API failed, using client-side fallback")
             removedBgUrl = await BackgroundRemovalService.removeBackground(file)
           }
        } catch (err) {
            console.warn("API error, using client-side fallback", err)
            removedBgUrl = await BackgroundRemovalService.removeBackground(file)
        }
        
        setProgress(100)
        setProcessedImage(removedBgUrl)
        
        setTimeout(() => {
          setView('gallery')
        }, 500)

      } catch (error) {
        console.error("Processing failed", error)
        setView('upload')
      }
    }
    reader.readAsDataURL(file)
  }

  // --- RENDER ---
  if (view === 'processing') return <ProcessingView progress={progress} />
  
  if (view === 'gallery') return (
    <GalleryView 
        processedImage={processedImage}
        shape={shape}
        setShape={setShape}
        onSelectBackground={(bg) => {
            setSelectedBg(bg)
            setView('editor')
        }}
    />
  )

  if (view === 'editor') return (
    <EditorView 
        processedImage={processedImage}
        shape={shape}
        background={selectedBg}
        setBackground={setSelectedBg}
        onBack={() => setView('gallery')}
        zoom={zoom} setZoom={setZoom}
        rotation={rotation} setRotation={setRotation}
        positionX={positionX} setPositionX={setPositionX}
        positionY={positionY} setPositionY={setPositionY}
        exportSize={exportSize} setExportSize={setExportSize}
        borderColor={borderColor} setBorderColor={setBorderColor}
        borderWidth={borderWidth} setBorderWidth={setBorderWidth}
        shadowIntensity={shadowIntensity} setShadowIntensity={setShadowIntensity}
        filters={filters} setFilters={setFilters}
        outline={outline} setOutline={setOutline}
        gradient={gradient} setGradient={setGradient}
        noiseTexture={noiseTexture} setNoiseTexture={setNoiseTexture}
    />
  )

  return <UploadView onUpload={processUpload} />
}
