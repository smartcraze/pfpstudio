'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Download, Eye } from 'lucide-react'

interface Template {
  id: string
  name: string
  description: string
  category: 'professional' | 'fun' | 'artistic' | 'gaming'
  preview: string
  animation: string
  colors: string[]
  shape: 'circle' | 'square'
  premium?: boolean
}

const templates: Template[] = [
  {
    id: 'professional-pulse',
    name: 'Professional Pulse',
    description: 'Subtle pulsing effect perfect for LinkedIn',
    category: 'professional',
    preview: '/templates/professional-pulse.gif',
    animation: 'pulse',
    colors: ['#3b82f6', '#1e40af'],
    shape: 'circle'
  },
  {
    id: 'gaming-neon',
    name: 'Gaming Neon',
    description: 'RGB gaming aesthetic with neon glow',
    category: 'gaming',
    preview: '/templates/gaming-neon.gif',
    animation: 'rainbow',
    colors: ['#ff0080', '#00ff80', '#8000ff'],
    shape: 'square',
    premium: true
  },
  {
    id: 'artistic-wave',
    name: 'Artistic Wave',
    description: 'Flowing wave distortion effect',
    category: 'artistic',
    preview: '/templates/artistic-wave.gif',
    animation: 'wave',
    colors: ['#8b5cf6', '#ec4899'],
    shape: 'circle'
  },
  {
    id: 'fun-bounce',
    name: 'Fun Bounce',
    description: 'Playful bouncing animation',
    category: 'fun',
    preview: '/templates/fun-bounce.gif',
    animation: 'bounce',
    colors: ['#f59e0b', '#f97316'],
    shape: 'circle'
  },
  {
    id: 'minimal-glow',
    name: 'Minimal Glow',
    description: 'Subtle glowing border effect',
    category: 'professional',
    preview: '/templates/minimal-glow.gif',
    animation: 'glow',
    colors: ['#6366f1', '#8b5cf6'],
    shape: 'circle'
  },
  {
    id: 'retro-spin',
    name: 'Retro Spin',
    description: 'Classic rotating animation',
    category: 'fun',
    preview: '/templates/retro-spin.gif',
    animation: 'spin',
    colors: ['#ef4444', '#f97316', '#eab308'],
    shape: 'square'
  }
]

interface TemplateGalleryProps {
  onSelectTemplate: (template: Template) => void
  selectedCategory?: string
}

export default function TemplateGallery({ onSelectTemplate, selectedCategory }: TemplateGalleryProps) {
  const categories = [
    { id: 'all', name: 'All Templates', count: templates.length },
    { id: 'professional', name: 'Professional', count: templates.filter(t => t.category === 'professional').length },
    { id: 'fun', name: 'Fun', count: templates.filter(t => t.category === 'fun').length },
    { id: 'artistic', name: 'Artistic', count: templates.filter(t => t.category === 'artistic').length },
    { id: 'gaming', name: 'Gaming', count: templates.filter(t => t.category === 'gaming').length }
  ]

  const filteredTemplates = selectedCategory && selectedCategory !== 'all' 
    ? templates.filter(template => template.category === selectedCategory)
    : templates

  const getCategoryColor = (category: string) => {
    const colors = {
      professional: 'bg-blue-100 text-blue-800',
      fun: 'bg-orange-100 text-orange-800',
      artistic: 'bg-purple-100 text-purple-800',
      gaming: 'bg-green-100 text-green-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getAnimationClass = (animation: string) => {
    const classes = {
      pulse: 'hover:animate-pulse',
      bounce: 'hover:animate-bounce',
      spin: 'hover:animate-spin',
      glow: 'hover:shadow-lg hover:shadow-purple-500/20',
      rainbow: 'hover:border-2 hover:border-purple-500',
      wave: 'hover:rounded-lg'
    }
    return classes[animation as keyof typeof classes] || ''
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-500" />
          Animation Templates
        </h2>
        <p className="text-muted-foreground">
          Choose from our collection of professionally designed animated templates
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            onClick={() => onSelectTemplate(template)}
          >
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative">
              {/* Template Preview */}
              <div className={`w-full h-full flex items-center justify-center ${getAnimationClass(template.animation)}`}>
                <div 
                  className={`w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 ${
                    template.shape === 'circle' ? 'rounded-full' : 'rounded-lg'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${template.colors.join(', ')})`
                  }}
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Premium Badge */}
              {template.premium && (
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    PRO
                  </Badge>
                </div>
              )}
            </div>

            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm truncate">{template.name}</h3>
                <Badge className={getCategoryColor(template.category)} variant="outline">
                  {template.category}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {template.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {template.colors.slice(0, 3).map((color, index) => (
                    <div
                      key={index}
                      className="w-3 h-3 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground capitalize">
                  {template.shape}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground">No templates found</h3>
          <p className="text-sm text-muted-foreground">
            Try selecting a different category or check back later for new templates.
          </p>
        </div>
      )}
    </div>
  )
}