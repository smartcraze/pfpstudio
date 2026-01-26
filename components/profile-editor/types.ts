export type ShapeType = 'circle' | 'square' | 'squircle'
export type ViewState = 'upload' | 'processing' | 'gallery' | 'editor'

export interface BackgroundPreset {
  id: string
  name: string
  value: string
  type: 'solid' | 'gradient'
}

export interface EditorState {
  zoom: number
  rotation: number
  positionX: number
  positionY: number
}
