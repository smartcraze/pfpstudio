import React from 'react'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BackgroundPreset, OutlineState, GradientState, ImageFilterState } from './types'
import { Move, Palette, Box, Layers, Image as ImageIcon, Sparkles, Wand2 } from 'lucide-react'
import { Switch } from '../ui/switch'

interface EditorControlsProps {
  zoom: number
  setZoom: (v: number) => void
  rotation: number
  setRotation: (v: number) => void
  positionX: number
  setPositionX: (v: number) => void
  positionY: number
  setPositionY: (v: number) => void
  exportSize: number
  setExportSize: (v: number) => void
  
  // Style Props
  borderColor: string
  setBorderColor: (v: string) => void
  borderWidth: number
  setBorderWidth: (v: number) => void
  shadowIntensity: number
  setShadowIntensity: (v: number) => void
  
  // Background Override
  background: BackgroundPreset
  setBackground: (bg: BackgroundPreset) => void

  // New Features
  filters: ImageFilterState
  setFilters: (v: ImageFilterState) => void
  outline: OutlineState
  setOutline: (v: OutlineState) => void
  gradient: GradientState
  setGradient: (v: GradientState) => void
  noiseTexture: boolean
  setNoiseTexture: (v: boolean) => void
}

export function EditorControls({
  zoom, setZoom,
  rotation, setRotation,
  positionX, setPositionX,
  positionY, setPositionY,
  exportSize, setExportSize,
  borderColor, setBorderColor,
  borderWidth, setBorderWidth,
  shadowIntensity, setShadowIntensity,
  background, setBackground,
  filters, setFilters,
  outline, setOutline,
  gradient, setGradient,
  noiseTexture, setNoiseTexture
}: EditorControlsProps) {

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackground({
        id: 'custom',
        name: 'Custom',
        value: e.target.value,
        type: 'solid'
    })
  }

  return (
    <Card className="p-4">
        <Tabs defaultValue="transform" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="transform"><Move className="w-4 h-4 sm:mr-2" /><span className="hidden sm:inline">Align</span></TabsTrigger>
                <TabsTrigger value="style"><Palette className="w-4 h-4 sm:mr-2" /><span className="hidden sm:inline">Style</span></TabsTrigger>
                <TabsTrigger value="image"><Wand2 className="w-4 h-4 sm:mr-2" /><span className="hidden sm:inline">Adjust</span></TabsTrigger>
            </TabsList>
            
            <TabsContent value="transform" className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="space-y-4">
                    <Label className="flex justify-between">
                        Zoom <span className="text-muted-foreground">{zoom}%</span>
                    </Label>
                    <Slider value={[zoom]} onValueChange={([v]) => setZoom(v)} min={50} max={200} step={1} />
                </div>

                <div className="space-y-4">
                    <Label className="flex justify-between">
                        Rotation <span className="text-muted-foreground">{rotation}°</span>
                    </Label>
                    <Slider value={[rotation]} onValueChange={([v]) => setRotation(v)} min={-180} max={180} step={5} />
                </div>

                <div className="space-y-4">
                    <Label>Position</Label>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <span className="text-xs text-muted-foreground">X Axis</span>
                            <Slider value={[positionX]} onValueChange={([v]) => setPositionX(v)} min={0} max={100} step={1} />
                        </div>
                        <div className="space-y-2">
                            <span className="text-xs text-muted-foreground">Y Axis</span>
                            <Slider value={[positionY]} onValueChange={([v]) => setPositionY(v)} min={0} max={100} step={1} />
                        </div>
                    </div>
                </div>
            </TabsContent>
            
            <TabsContent value="style" className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                {/* 1. Outline (Sticker) */}
                 <div className="space-y-4 border-b pb-4">
                    <div className="flex items-center justify-between">
                         <Label className="font-semibold flex items-center gap-2">
                             <Sparkles className="w-4 h-4 text-purple-500" /> Subject Outline
                         </Label>
                         <div className="flex items-center gap-2">
                            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-input shadow-sm">
                                <input type="color" value={outline.color} onChange={(e) => setOutline({...outline, color: e.target.value})} className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 p-0 cursor-pointer border-0" />
                            </div>
                         </div>
                    </div>
                    <Slider value={[outline.width]} onValueChange={([v]) => setOutline({...outline, width: v})} min={0} max={20} step={1} />
                </div>

                {/* 2. Border Controls */}
                <div className="space-y-4 border-b pb-4">
                    <div className="flex items-center justify-between">
                         <Label className="font-semibold flex items-center gap-2">
                             <Box className="w-4 h-4" /> Border
                         </Label>
                         <div className="flex items-center gap-2">
                            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-input shadow-sm">
                                <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 p-0 cursor-pointer border-0" />
                            </div>
                         </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-xs"><span>Width</span><span className="text-muted-foreground">{borderWidth}px</span></div>
                        <Slider value={[borderWidth]} onValueChange={([v]) => setBorderWidth(v)} min={0} max={20} step={1} />
                    </div>
                </div>

                {/* 3. Shadow Controls */}
                <div className="space-y-4 border-b pb-4">
                    <Label className="font-semibold">Shadow Intensity</Label>
                    <div className="flex items-center gap-4">
                        <Slider value={[shadowIntensity]} onValueChange={([v]) => setShadowIntensity(v)} min={0} max={50} step={1} className="flex-1" />
                        <span className="w-8 text-right text-xs text-muted-foreground">{shadowIntensity}</span>
                    </div>
                </div>

                {/* 4. Background - Updated for Gradient */}
                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label className="font-semibold">Background</Label>
                        {gradient.enabled && <Label className="text-xs text-muted-foreground">Angle: {gradient.angle}°</Label>}
                    </div>
                    
                    {/* Custom Gradient Controls */}
                    {background.id.startsWith('grad') || gradient.enabled ? (
                        <div className="space-y-3 p-3 bg-muted/30 rounded-lg border">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Gradient Editor</span>
                                <Switch checked={gradient.enabled} onCheckedChange={(e) => setGradient({...gradient, enabled: e})} />
                            </div>
                            
                            {gradient.enabled && (
                                <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                                    <div className="flex justify-between gap-4">
                                        <div className="space-y-1 flex-1">
                                            <span className="text-xs text-muted-foreground">Start</span>
                                            <div className="h-8 rounded-md border overflow-hidden relative">
                                                <input type="color" value={gradient.color1} onChange={(e) => setGradient({...gradient, color1: e.target.value})} className="opacity-0 w-full h-full cursor-pointer absolute inset-0 z-10" />
                                                <div className="absolute inset-0" style={{background: gradient.color1}} />
                                            </div>
                                        </div>
                                        <div className="space-y-1 flex-1">
                                            <span className="text-xs text-muted-foreground">End</span>
                                            <div className="h-8 rounded-md border overflow-hidden relative">
                                                <input type="color" value={gradient.color2} onChange={(e) => setGradient({...gradient, color2: e.target.value})} className="opacity-0 w-full h-full cursor-pointer absolute inset-0 z-10" />
                                                <div className="absolute inset-0" style={{background: gradient.color2}} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-1">
                                         <Slider value={[gradient.angle]} onValueChange={([v]) => setGradient({...gradient, angle: v})} min={0} max={360} step={5} />
                                    </div>
                                </div>
                            )}
                        </div>
                    ): (
                         <div className="flex items-center gap-3">
                             <div className="relative flex-1 h-10 rounded-md border shadow-sm overflow-hidden group hover:border-blue-500 transition-colors">
                                 <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none" style={{ background: background.value }} />
                                 <input type="color" value={background.type === 'solid' ? background.value : '#ffffff'} onChange={handleColorChange} className="opacity-0 w-full h-full cursor-pointer" />
                                 <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-xs font-medium bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity">Custom Color</div>
                             </div>
                        </div>
                    )}
                </div>
            </TabsContent>
            
            <TabsContent value="image" className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-6">
                     <div className="flex items-center justify-between border-b pb-4">
                        <Label className="flex items-center gap-2 font-semibold">
                            <Layers className="w-4 h-4" /> Noise Texture
                        </Label>
                        <Switch checked={noiseTexture} onCheckedChange={setNoiseTexture} />
                     </div>

                     <div className="space-y-4">
                        <Label className="font-semibold">Filters</Label>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between text-xs"><span>Brightness</span><span>{filters.brightness}%</span></div>
                            <Slider value={[filters.brightness]} onValueChange={([v]) => setFilters({...filters, brightness: v})} min={0} max={200} step={1} />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-xs"><span>Contrast</span><span>{filters.contrast}%</span></div>
                            <Slider value={[filters.contrast]} onValueChange={([v]) => setFilters({...filters, contrast: v})} min={0} max={200} step={1} />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-xs"><span>Saturation</span><span>{filters.saturation}%</span></div>
                            <Slider value={[filters.saturation]} onValueChange={([v]) => setFilters({...filters, saturation: v})} min={0} max={200} step={1} />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-xs"><span>Grayscale</span><span>{filters.grayscale}%</span></div>
                            <Slider value={[filters.grayscale]} onValueChange={([v]) => setFilters({...filters, grayscale: v})} min={0} max={100} step={1} />
                        </div>
                     </div>
                </div>
            </TabsContent>
        </Tabs>

        <div className="pt-4 mt-2">
            <Label className="mb-3 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Output Size</Label>
            <div className="flex gap-2">
                {[400, 800, 1024].map(s => (
                    <Button 
                        key={s} 
                        variant={exportSize === s ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setExportSize(s)}
                        className="flex-1"
                    >
                        {s}px
                    </Button>
                ))}
            </div>
        </div>
    </Card>
  )
}
