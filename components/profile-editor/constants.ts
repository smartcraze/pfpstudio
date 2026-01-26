import { BackgroundPreset, OutlineState, GradientState, ImageFilterState } from './types'

export const PRESET_BACKGROUNDS: BackgroundPreset[] = [
  { id: 'transparent', name: 'Transparent', value: 'transparent', type: 'solid' },
  { id: 'white', name: 'White', value: '#ffffff', type: 'solid' },
  { id: 'slate', name: 'Slate', value: '#cbd5e1', type: 'solid' },
  { id: 'blue', name: 'Blue', value: '#3b82f6', type: 'solid' },
  { id: 'purple', name: 'Purple', value: '#a855f7', type: 'solid' },
  { id: 'pink', name: 'Pink', value: '#ec4899', type: 'solid' },
  { id: 'rose', name: 'Rose', value: '#f43f5e', type: 'solid' },
  { id: 'orange', name: 'Orange', value: '#f97316', type: 'solid' },
  { id: 'yellow', name: 'Yellow', value: '#eab308', type: 'solid' },
  { id: 'green', name: 'Green', value: '#22c55e', type: 'solid' },
  { id: 'emerald', name: 'Emerald', value: '#10b981', type: 'solid' },
  { id: 'teal', name: 'Teal', value: '#14b8a6', type: 'solid' },
  { id: 'cyan', name: 'Cyan', value: '#06b6d4', type: 'solid' },
  { id: 'sky', name: 'Sky', value: '#0ea5e9', type: 'solid' },
  { id: 'indigo', name: 'Indigo', value: '#6366f1', type: 'solid' },
  { id: 'dark', name: 'Midnight', value: '#0f172a', type: 'solid' },
  // Gradients
  { id: 'grad-blue', name: 'Ocean', value: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)', type: 'gradient' },
  { id: 'grad-purple', name: 'Royal', value: 'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)', type: 'gradient' },
  { id: 'grad-sunset', name: 'Sunset', value: 'linear-gradient(135deg, #fba74e 0%, #fe7c60 100%)', type: 'gradient' },
  { id: 'grad-teal', name: 'Tropical', value: 'linear-gradient(135deg, #2dd4bf 0%, #0d9488 100%)', type: 'gradient' },
  { id: 'grad-berry', name: 'Berry', value: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', type: 'gradient' },
  { id: 'grad-midnight', name: 'Neon Night', value: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)', type: 'gradient' },
  // Textured Presets (Mocking combinations)
  { id: 'texture-dots', name: 'Black Dots', value: '#ffffff', type: 'solid', texture: 'dots', textureOpacity: 0.2 },
  { id: 'texture-grid', name: 'Blueprint', value: '#3b82f6', type: 'solid', texture: 'grid', textureOpacity: 0.3, textureColor: '#ffffff' },
  { id: 'texture-noise', name: 'Grainy Dark', value: '#0f172a', type: 'solid', texture: 'noise', textureOpacity: 0.5 },
  // Image Presets
  { id: 'bg-1-pre', name: 'Abstract 1', value: '/backdrop/backdrop_1.png', type: 'image' },
  { id: 'bg-2-pre', name: 'Abstract 2', value: '/backdrop/backdrop_2.png', type: 'image' },
  // Decal Presets
  { id: 'decal-globe-pre', name: 'Global', value: '#0f172a', type: 'solid', decal: 'globe', decalOpacity: 0.1, decalColor: '#ffffff' },
  { id: 'decal-window-pre', name: 'Window', value: '#F43F5E', type: 'solid', decal: 'window', decalOpacity: 0.3 },
  { id: 'decal-organic-pre', name: 'Organic', value: '#a855f7', type: 'solid', decal: 'decal-1', decalOpacity: 0.3, decalColor: '#ffffff' },
  { id: 'decal-shape2-pre', name: 'Geometry', value: '#3b82f6', type: 'solid', decal: 'decal-2', decalOpacity: 0.2, decalColor: '#ffffff' },
  { id: 'decal-shape3-pre', name: 'Flow', value: '#10b981', type: 'solid', decal: 'decal-3', decalOpacity: 0.25 },
  { id: 'decal-shape4-pre', name: 'Tech', value: '#0f172a', type: 'solid', decal: 'decal-4', decalOpacity: 0.15, decalColor: '#38bdf8' },
  { id: 'decal-shape5-pre', name: 'Rings', value: '#eab308', type: 'solid', decal: 'decal-5', decalOpacity: 0.3 },
  { id: 'decal-shape6-pre', name: 'Abstract', value: '#6366f1', type: 'solid', decal: 'decal-6', decalOpacity: 0.2, decalColor: '#ffffff' },
  { id: 'decal-shape7-pre', name: 'Waves', value: '#ec4899', type: 'solid', decal: 'decal-7', decalOpacity: 0.3 },
  { id: 'decal-shape8-pre', name: 'Modern', value: '#14b8a6', type: 'solid', decal: 'decal-8', decalOpacity: 0.25 },
  { id: 'decal-shape9-pre', name: 'Burst', value: '#f97316', type: 'solid', decal: 'decal-9', decalOpacity: 0.2, decalColor: '#ffffff' },
]

export const IMAGE_BACKGROUNDS: BackgroundPreset[] = [
  { id: 'bg-1', name: 'Abstract 1', value: '/backdrop/backdrop_1.png', type: 'image' },
  { id: 'bg-2', name: 'Abstract 2', value: '/backdrop/backdrop_2.png', type: 'image' },
  { id: 'bg-3', name: 'Abstract 3', value: '/backdrop/backdrop_3.png', type: 'image' },
  { id: 'bg-4', name: 'Abstract 4', value: '/backdrop/backdrop_4.png', type: 'image' },
]

export const DECALS = [
  { id: 'none', name: 'None', url: '' },
  { id: 'globe', name: 'Globe', url: '/globe.svg' },
  { id: 'window', name: 'Window', url: '/window.svg' },
  { id: 'decal-1', name: 'Shape 1', url: '/decal/decals-1.svg' },
  { id: 'decal-2', name: 'Shape 2', url: '/decal/decals-2.svg' },
  { id: 'decal-3', name: 'Shape 3', url: '/decal/decals-3.svg' },
  { id: 'decal-4', name: 'Shape 4', url: '/decal/decals-4.svg' },
  { id: 'decal-5', name: 'Shape 5', url: '/decal/dacals-5.svg' },
  { id: 'decal-6', name: 'Shape 6', url: '/decal/dacals-6.svg' },
  { id: 'decal-7', name: 'Shape 7', url: '/decal/dacals-7.svg' },
  { id: 'decal-8', name: 'Shape 8', url: '/decal/dacals-8.svg' },
  { id: 'decal-9', name: 'Shape 9', url: '/decal/decals-9.svg' },
]

export const SHADOWS = [
  { id: 'none', name: 'None', url: '' },
  { id: 'shadow-1', name: 'Shadow 1', url: '/shadow/shadow_01.png' },
  { id: 'shadow-2', name: 'Shadow 2', url: '/shadow/shadow_02.png' },
  { id: 'shadow-3', name: 'Shadow 3', url: '/shadow/shadow_03.png' },
  { id: 'shadow-4', name: 'Shadow 4', url: '/shadow/shadow_04.png' },
]

export const DEFAULT_FILTERS: ImageFilterState = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  grayscale: 0
}

export const DEFAULT_OUTLINE: OutlineState = {
  color: '#ffffff',
  width: 0
}

export const DEFAULT_GRADIENT: GradientState = {
  enabled: false,
  color1: '#6366f1',
  color2: '#a855f7',
  angle: 135
}
