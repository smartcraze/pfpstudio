import React from 'react'
import { MultiStepLoader } from '@/components/ui/multi-step-loader'

const loadingStates = [
  { text: "Uploading your photo..." },
  { text: "Analyzing facial features..." },
  { text: "Removing background clutter..." },
  { text: "Enhancing image quality..." },
  { text: "Applying studio lighting..." },
  { text: "Generating variations..." },
  { text: "Finalizing your profile..." },
];

interface ProcessingViewProps {
  progress?: number
  loading?: boolean
}

export function ProcessingView({ progress, loading = true }: ProcessingViewProps) {
  // We use the multi-step loader which provides a better UX than a simple progress bar
  return (
    <MultiStepLoader
      loadingStates={loadingStates}
      loading={loading}
      duration={1200}
      loop={false}
    />
  )
}
