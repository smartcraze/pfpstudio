export type ShapeType = 'circle' | 'square' | 'squircle'
export type ViewState = 'upload' | 'processing' | 'gallery' | 'editor'

export interface BackgroundPreset {
  id: string
  name: string
  value: string
  type: 'solid' | 'gradient'
}

export interface ImageFilterState {
  brightness: number
  contrast: number
  saturation: number
  grayscale: number
}

export interface OutlineState {
  color: string
  width: number
}

export interface GradientState {
  enabled: boolean
  color1: string
  color2: string
  angle: number
}
