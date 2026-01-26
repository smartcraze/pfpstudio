import * as GIF from 'gif.js'

declare global {
  interface Window {
    GIF: typeof GIF
  }
}

export class GIFGenerator {
  static async generateAnimatedGIF(
    canvas: HTMLCanvasElement,
    animationType: string,
    duration: number = 2000,
    frames: number = 24
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      try {
        // Initialize GIF.js
        const gif = new (window.GIF || GIF.default)({
          workers: 2,
          quality: 10,
          width: canvas.width,
          height: canvas.height,
        })

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Could not get canvas context'))
          return
        }

        // Generate frames based on animation type
        const frameDelay = duration / frames
        
        for (let i = 0; i < frames; i++) {
          const progress = i / frames
          
          // Clear canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          
          // Apply animation transformations based on type
          switch (animationType) {
            case 'pulse':
              const scale = 1 + Math.sin(progress * Math.PI * 2) * 0.1
              ctx.save()
              ctx.scale(scale, scale)
              break
              
            case 'bounce':
              const bounce = Math.abs(Math.sin(progress * Math.PI * 4)) * 20
              ctx.save()
              ctx.translate(0, -bounce)
              break
              
            case 'spin':
              const rotation = progress * Math.PI * 2
              ctx.save()
              ctx.translate(canvas.width / 2, canvas.height / 2)
              ctx.rotate(rotation)
              ctx.translate(-canvas.width / 2, -canvas.height / 2)
              break
              
            case 'glow':
              ctx.save()
              ctx.shadowBlur = 20 + Math.sin(progress * Math.PI * 2) * 15
              ctx.shadowColor = '#9333ea'
              break
              
            case 'rainbow':
              const hue = progress * 360
              ctx.save()
              ctx.strokeStyle = `hsl(${hue}, 70%, 50%)`
              ctx.lineWidth = 4
              break
          }
          
          // Add frame to GIF
          gif.addFrame(canvas, { delay: frameDelay })
          
          ctx.restore()
        }

        gif.on('finished', (blob: Blob) => {
          resolve(blob)
        })

       
        gif.render()
      } catch (error) {
        reject(error)
      }
    })
  }

  static async createStaticFrame(
    imageData: ImageData,
    shape: 'circle' | 'square',
    size: number = 400,
    backgroundColor: string = 'transparent'
  ): Promise<HTMLCanvasElement> {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    if (!ctx) {
      throw new Error('Could not create canvas context')
    }

    canvas.width = size
    canvas.height = size

    // Set background
    if (backgroundColor !== 'transparent') {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, size, size)
    }

    // Create temporary canvas for the image
    const tempCanvas = document.createElement('canvas')
    const tempCtx = tempCanvas.getContext('2d')
    
    if (!tempCtx) {
      throw new Error('Could not create temporary canvas context')
    }

    tempCanvas.width = imageData.width
    tempCanvas.height = imageData.height
    tempCtx.putImageData(imageData, 0, 0)

    // Apply shape clipping
    ctx.save()
    if (shape === 'circle') {
      ctx.beginPath()
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
      ctx.clip()
    } else {
      ctx.beginPath()
      ctx.roundRect(0, 0, size, size, 10)
      ctx.clip()
    }

    // Draw the image
    ctx.drawImage(tempCanvas, 0, 0, size, size)
    ctx.restore()

    return canvas
  }
}