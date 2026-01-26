'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { BackgroundPreset, ShapeType, ImageFilterState, OutlineState, GradientState } from '@/components/profile-editor/types'
import { PRESET_BACKGROUNDS, DEFAULT_FILTERS, DEFAULT_OUTLINE, DEFAULT_GRADIENT } from '@/components/profile-editor/constants'
import { BackgroundRemovalService } from './image-processing'
import { useRouter } from 'next/navigation'

interface ProfileContextType {
  // Image Data
  processedImage: string | null
  setProcessedImage: (url: string | null) => void
  isProcessing: boolean
  processImage: (file: File) => Promise<void>
  
  // Editor State
  shape: ShapeType
  setShape: (s: ShapeType) => void
  selectedBg: BackgroundPreset
  setSelectedBg: (bg: BackgroundPreset) => void
  
  // Transform State
  zoom: number; setZoom: (v: number) => void
  rotation: number; setRotation: (v: number) => void
  positionX: number; setPositionX: (v: number) => void
  positionY: number; setPositionY: (v: number) => void
  exportSize: number; setExportSize: (v: number) => void

  // Style State
  borderColor: string; setBorderColor: (v: string) => void
  borderWidth: number; setBorderWidth: (v: number) => void
  shadowIntensity: number; setShadowIntensity: (v: number) => void

  // Advanced State
  filters: ImageFilterState; setFilters: (v: ImageFilterState) => void
  outline: OutlineState; setOutline: (v: OutlineState) => void
  gradient: GradientState; setGradient: (v: GradientState) => void
  noiseTexture: boolean; setNoiseTexture: (v: boolean) => void
  
  // Reset
  resetEditor: () => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  
  // Global State
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  
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

  const processImage = async (file: File) => {
    setIsProcessing(true)
    
    // Determine where to navigate - maybe to a processing route or keep on page but show loader
    // For now, let's assume the component consuming this will handle the UI feedback for isProcessing
    // But we will navigate to gallery on success.

    try { 
        // Read file for immediate feedback if needed, but we mostly need the processed one
        const reader = new FileReader()
        reader.onload = async (e) => {
             // We can store the original too if we want to re-process differently later
        }
        reader.readAsDataURL(file)

        const formData = new FormData()
        formData.append('image', file)
        
        let removedBgUrl = ""

        try {
           // Attempt server-side processing
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
        
        setProcessedImage(removedBgUrl)
        router.push('/gallery')
        
    } catch (error) {
        console.error("Processing failed", error)
        // Handle error state
    } finally {
        setIsProcessing(false)
    }
  }

  const resetEditor = () => {
      setShape('circle')
      setSelectedBg(PRESET_BACKGROUNDS[1])
      setZoom(100)
      setRotation(0)
      setPositionX(50)
      setPositionY(50)
      setFilters(DEFAULT_FILTERS)
      setOutline(DEFAULT_OUTLINE)
      setGradient(DEFAULT_GRADIENT)
      setNoiseTexture(false)
      setBorderWidth(0)
      setShadowIntensity(0)
  }

  // Ensure texture defaults are present when selecting bg
  const handleSetSelectedBg = (bg: BackgroundPreset) => {
      setSelectedBg({
          texture: 'none',
          textureOpacity: 0.1,
          ...bg
      })
  }

  const value = {
      processedImage, setProcessedImage,
      isProcessing, processImage,
      shape, setShape,
      selectedBg, setSelectedBg: handleSetSelectedBg,
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
      noiseTexture, setNoiseTexture,
      resetEditor
  }

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}
