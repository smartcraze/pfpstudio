import { BackgroundPreset } from './types'

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
]
