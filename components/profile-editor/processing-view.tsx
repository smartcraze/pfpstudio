import React from 'react'
import { Image as ImageIcon } from 'lucide-react'

interface ProcessingViewProps {
  progress: number
}

export function ProcessingView({ progress }: ProcessingViewProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
      <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-muted flex items-center justify-center">
             <ImageIcon className="w-10 h-10 text-muted-foreground opacity-50" />
          </div>
          <div className="absolute inset-0">
              <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="46" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    className="text-primary transition-all duration-300 ease-out"
                    strokeDasharray={`${progress * 2.89} 289`}
                    strokeLinecap="round"
                  />
              </svg>
          </div>
      </div>
      <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">Removing Background...</h3>
          <p className="text-muted-foreground">Making your profile picture perfect</p>
      </div>
    </div>
  )
}
