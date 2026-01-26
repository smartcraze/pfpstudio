'use client'

import React, { useState } from 'react'
import { BackgroundRemovalService } from '@/lib/image-processing'
import { UploadView } from './upload-view'
import { ProcessingView } from './processing-view'
import { GalleryView } from './gallery-view'
import { EditorView } from './editor-view'
import { PRESET_BACKGROUNDS } from './constants'
import { BackgroundPreset, ShapeType, ViewState } from './types'

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
    />
  )

  return <UploadView onUpload={processUpload} />
}
