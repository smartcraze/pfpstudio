import React from 'react'
import { PRESET_BACKGROUNDS } from './constants'
import { BackgroundPreset, ShapeType } from './types'
import { cn } from '@/lib/utils'

interface GalleryViewProps {
  processedImage: string | null
  shape: ShapeType
  setShape: (s: ShapeType) => void
  onSelectBackground: (bg: BackgroundPreset) => void
}

export function GalleryView({ processedImage, shape, setShape, onSelectBackground }: GalleryViewProps) {
  
  const getBackgroundStyle = (bgValue: string) => {
    if (bgValue === 'transparent') {
        return {
          backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
          backgroundSize: '8px 8px',
          backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
          backgroundColor: '#ffffff'
        }
    }
    return { background: bgValue }
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Pick your perfect look</h1>
            <p className="text-muted-foreground">We've removed the background. Now select a style to customize.</p>
            
            <div className="inline-flex bg-muted p-1 rounded-lg border">
                {(['circle', 'squircle', 'square'] as const).map((s) => (
                    <button 
                        key={s}
                        onClick={() => setShape(s)}
                        className={cn(
                            "px-4 py-2 rounded-md text-sm font-medium transition-all capitalize", 
                            shape === s ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {s === 'squircle' ? 'Rounded' : s}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {PRESET_BACKGROUNDS.map((bg) => (
                <div 
                key={bg.id} 
                className="group cursor-pointer space-y-3"
                onClick={() => onSelectBackground(bg)}
                >
                <div className="relative aspect-square bg-white border rounded-xl overflow-hidden shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                            <div 
                            className={cn(
                                "w-full h-full overflow-hidden relative",
                                shape === 'circle' && "rounded-full",
                                shape === 'square' && "rounded-none",
                                shape === 'squircle' && "rounded-[22%]"
                            )}
                            style={getBackgroundStyle(bg.value)}
                            >
                            {processedImage && (
                                <img 
                                    src={processedImage} 
                                    alt={bg.name}
                                    className="w-full h-full object-cover" 
                                />
                            )}
                            </div>
                        </div>
                        
                        <div className="absolute inset-0 bg-transparent group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 bg-background/90 backdrop-blur text-xs font-semibold px-3 py-1 rounded-full shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-all text-foreground">
                                Edit / Download
                            </div>
                        </div>
                </div>
                <p className="text-center text-sm font-medium text-muted-foreground group-hover:text-foreground">{bg.name}</p>
                </div>
            ))}
        </div>
    </div>
  )
}
