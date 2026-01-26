'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useProfile } from '@/lib/profile-context'
import { EditorView } from '@/components/profile-editor/editor-view'

export default function EditorPage() {
  const router = useRouter()
  const { 
    processedImage, 
    shape, setShape,
    selectedBg, setSelectedBg,
    zoom, setZoom,
    rotation, setRotation,
    positionX, setPositionX,
    positionY, setPositionY,
    exportSize, setExportSize,
    borderColor, setBorderColor,
    borderWidth, setBorderWidth,
    shadowIntensity, setShadowIntensity,
    filters, setFilters,
    outline, setOutline,
    gradient, setGradient,
    noiseTexture, setNoiseTexture
  } = useProfile()

  useEffect(() => {
    if (!processedImage) {
      router.replace('/')
    }
  }, [processedImage, router])

  if (!processedImage) return null

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col p-4 md:p-8">
        <EditorView 
            processedImage={processedImage}
            shape={shape} setShape={setShape}
            background={selectedBg}
            setBackground={setSelectedBg}
            onBack={() => router.push('/gallery')}
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
    </main>
  )
}
