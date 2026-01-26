// Background removal service using client-side processing
export class BackgroundRemovalService {
  static async removeBackground(imageFile: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Could not get canvas context'))
        return
      }

      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        
        // Draw the image
        ctx.drawImage(img, 0, 0)
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
        
        // Improved background removal algorithm
        // Detect edges first
        const edges = this.detectEdges(imageData)
        
        // Remove background based on color similarity and edge detection
        for (let i = 0; i < data.length; i += 4) {
          const pixelIndex = i / 4
          const x = pixelIndex % canvas.width
          const y = Math.floor(pixelIndex / canvas.width)
          
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          
          // Skip if it's an edge pixel (likely part of subject)
          if (edges[pixelIndex]) {
            continue
          }
          
          // Remove white/light backgrounds
          if (r > 240 && g > 240 && b > 240) {
            data[i + 3] = 0 // Make transparent
            continue
          }
          
          // Remove backgrounds based on corner similarity
          if (this.isBackgroundColor(r, g, b, data, canvas.width, canvas.height)) {
            data[i + 3] = Math.max(0, data[i + 3] - 200) // Reduce opacity
          }
        }
        
        // Put the processed image data back
        ctx.putImageData(imageData, 0, 0)
        
        // Convert to data URL
        const processedImageUrl = canvas.toDataURL('image/png')
        resolve(processedImageUrl)
      }
      
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = URL.createObjectURL(imageFile)
    })
  }

  private static detectEdges(imageData: ImageData): boolean[] {
    const data = imageData.data
    const width = imageData.width
    const height = imageData.height
    const edges = new Array(width * height).fill(false)
    
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4
        
        // Sobel edge detection
        const gx = (
          -data[((y - 1) * width + (x - 1)) * 4] + data[((y - 1) * width + (x + 1)) * 4] +
          -2 * data[(y * width + (x - 1)) * 4] + 2 * data[(y * width + (x + 1)) * 4] +
          -data[((y + 1) * width + (x - 1)) * 4] + data[((y + 1) * width + (x + 1)) * 4]
        )
        
        const gy = (
          -data[((y - 1) * width + (x - 1)) * 4] - 2 * data[((y - 1) * width + x) * 4] - data[((y - 1) * width + (x + 1)) * 4] +
          data[((y + 1) * width + (x - 1)) * 4] + 2 * data[((y + 1) * width + x) * 4] + data[((y + 1) * width + (x + 1)) * 4]
        )
        
        const magnitude = Math.sqrt(gx * gx + gy * gy)
        edges[y * width + x] = magnitude > 50
      }
    }
    
    return edges
  }

  private static isBackgroundColor(r: number, g: number, b: number, data: Uint8ClampedArray, width: number, height: number): boolean {
    // Sample corner colors to determine background
    const corners = [
      { r: data[0], g: data[1], b: data[2] }, // top-left
      { r: data[(width - 1) * 4], g: data[(width - 1) * 4 + 1], b: data[(width - 1) * 4 + 2] }, // top-right
      { r: data[((height - 1) * width) * 4], g: data[((height - 1) * width) * 4 + 1], b: data[((height - 1) * width) * 4 + 2] }, // bottom-left
      { r: data[((height - 1) * width + width - 1) * 4], g: data[((height - 1) * width + width - 1) * 4 + 1], b: data[((height - 1) * width + width - 1) * 4 + 2] } // bottom-right
    ]
    
    // Check similarity to corner colors
    return corners.some(corner => {
      const distance = Math.sqrt(
        Math.pow(r - corner.r, 2) + 
        Math.pow(g - corner.g, 2) + 
        Math.pow(b - corner.b, 2)
      )
      return distance < 40 // Threshold for color similarity
    })
  }

  // Integration with remove.bg API (for server-side usage)
  static async removeBackgroundWithAPI(imageFile: File): Promise<string> {
    try {
      const formData = new FormData()
      formData.append('image', imageFile)
      
      const response = await fetch('/api/remove-background', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Background removal failed')
      }

      const result = await response.json()
      return result.processedImage
    } catch (error) {
      console.error('API background removal failed:', error)
      // Fallback to client-side removal
      return this.removeBackground(imageFile)
    }
  }
}

// Animation generation utilities
export class AnimationGenerator {
  static generateCSS(animationType: string, shape: string): string {
    const animations = {
      pulse: `
        @keyframes profilePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .profile-pulse { animation: profilePulse 2s ease-in-out infinite; }
      `,
      bounce: `
        @keyframes profileBounce {
          0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
          40%, 43% { transform: translateY(-10px); }
          70% { transform: translateY(-5px); }
          90% { transform: translateY(-2px); }
        }
        .profile-bounce { animation: profileBounce 2s ease-in-out infinite; }
      `,
      spin: `
        @keyframes profileSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .profile-spin { animation: profileSpin 3s linear infinite; }
      `,
      glow: `
        @keyframes profileGlow {
          0%, 100% { box-shadow: 0 0 5px rgba(147, 51, 234, 0.5); }
          50% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.8), 0 0 30px rgba(147, 51, 234, 0.6); }
        }
        .profile-glow { animation: profileGlow 2s ease-in-out infinite; }
      `,
      rainbow: `
        @keyframes profileRainbow {
          0% { border-color: #ff0000; }
          16.66% { border-color: #ff8000; }
          33.33% { border-color: #ffff00; }
          50% { border-color: #00ff00; }
          66.66% { border-color: #0080ff; }
          83.33% { border-color: #8000ff; }
          100% { border-color: #ff0000; }
        }
        .profile-rainbow { 
          border: 3px solid;
          animation: profileRainbow 3s linear infinite; 
        }
      `,
      wave: `
        @keyframes profileWave {
          0%, 100% { border-radius: ${shape === 'circle' ? '50%' : '10px'}; }
          25% { border-radius: ${shape === 'circle' ? '40% 60% 60% 40%' : '20px 10px 20px 10px'}; }
          50% { border-radius: ${shape === 'circle' ? '60% 40% 40% 60%' : '10px 20px 10px 20px'}; }
          75% { border-radius: ${shape === 'circle' ? '40% 60% 60% 40%' : '20px 10px 20px 10px'}; }
        }
        .profile-wave { animation: profileWave 4s ease-in-out infinite; }
      `
    }

    return animations[animationType as keyof typeof animations] || ''
  }

  static generateGIF(canvas: HTMLCanvasElement, frames: ImageData[], duration: number = 2000): Promise<Blob> {
    return new Promise((resolve, reject) => {
      // This is a simplified GIF generation
      // For production, you might want to use a library like gif.js
      
      // For now, we'll return the canvas as PNG
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Failed to generate image'))
        }
      }, 'image/png')
    })
  }
}