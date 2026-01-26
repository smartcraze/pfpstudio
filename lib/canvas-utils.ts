import { BackgroundPreset, ShapeType, ImageFilterState, OutlineState, GradientState } from '@/components/profile-editor/types'

interface DrawOptions {
  canvas: HTMLCanvasElement
  image: HTMLImageElement
  backgroundImage?: HTMLImageElement
  decalImage?: HTMLImageElement
  shape: ShapeType
  background: BackgroundPreset
  gradient: GradientState
  filters: ImageFilterState
  outline: OutlineState
  zoom: number
  rotation: number
  positionX: number
  positionY: number
  size: number
  borderColor: string
  borderWidth: number
  shadowIntensity: number
  noiseTexture: boolean
}

// Convert angle to gradient coordinates
const getGradientCoords = (w: number, h: number, angleDeg: number) => {
  const angleRad = (angleDeg - 90) * (Math.PI / 180)
  const length = Math.abs(w * Math.sin(angleRad)) + Math.abs(h * Math.cos(angleRad))
  const center = { x: w / 2, y: h / 2 }
  return {
    x0: center.x - Math.cos(angleRad) * length / 2,
    y0: center.y - Math.sin(angleRad) * length / 2,
    x1: center.x + Math.cos(angleRad) * length / 2,
    y1: center.y + Math.sin(angleRad) * length / 2
  }
}

export const drawProfileImage = ({
  canvas,
  image,
  backgroundImage,
  decalImage,
  shape,
  background,
  gradient,
  filters,
  outline,
  zoom,
  rotation,
  positionX,
  positionY,
  size,
  borderColor,
  borderWidth,
  shadowIntensity,
  noiseTexture
}: DrawOptions) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = size
  canvas.height = size
  
  // High quality smoothing
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  
  ctx.clearRect(0, 0, size, size)
  
  // Scale units relative to export size (base 320px)
  const scaleFactor = size / 320
  const scaledBorder = borderWidth * scaleFactor
  const scaledShadow = shadowIntensity * scaleFactor
  const scaledOutlineWidth = outline.width * scaleFactor

  // 1. Draw Drop Shadow (Behind everything)
  if (shadowIntensity > 0) {
    ctx.save()
    ctx.beginPath()
    if (shape === 'circle') {
      ctx.arc(size / 2, size / 2, size / 2 - scaledShadow, 0, Math.PI * 2)
    } else if (shape === 'squircle') {
      const r = size * 0.2
      ctx.roundRect(scaledShadow, scaledShadow, size - (scaledShadow*2), size - (scaledShadow*2), r)
    } else {
      ctx.rect(scaledShadow, scaledShadow, size - (scaledShadow*2), size - (scaledShadow*2))
    }
    // Shadow Setup
    ctx.shadowColor = 'rgba(0,0,0,0.5)'
    ctx.shadowBlur = scaledShadow * 2
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = scaledShadow / 2
    ctx.fillStyle = '#000000'
    ctx.fill()
    ctx.restore()
  }

  // 2. Define Main Clipping Path (The Shape)
  ctx.save()
  ctx.beginPath()
  
  if (shape === 'circle') {
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
  } else if (shape === 'squircle') {
    const r = size * 0.2
    ctx.roundRect(0, 0, size, size, r)
  } else {
    ctx.rect(0, 0, size, size)
  }
  
  ctx.clip()

  // 3. Draw Background
  if (background.type === 'image') {
       // Draw custom background image
       // Since loading an image inside a synchronous draw function is hard, 
       // we assume the caller has pre-loaded it or we use a pattern if available.
       // However, for this implementation, we will try to stick to the pattern of 'value' being a URL
       // But 'value' here is likely a string URL. We can't synchronously load it.
       // The 'image' prop passed to this function is the SUBJECT.
       // To fix this properly, we need to preload the BG image in EditorPreview.
       // For now, let's skip drawing it here if it's not a color/gradient, 
       // OR we assume EditorPreview handles drawing the BG canvas underneath.
       // ACTUALLY: We must draw it here for the download to work.
       
       // Quick fix: We can try to get the image from the DOM if it exists, or 
       // we rely on the fact that if background.type is 'image', the value IS a dataURL or loaded src.
       // But check below.
       
       // Hack for now: We won't draw async images here easily without refactoring 'drawProfileImage' to be async.
       // Optimally: 'value' should be a pattern context? No.
       
       // Let's rely on 'drawProfileImage' being able to get the image element if we pass it.
       // But we didn't pass a 'backgroundImageElement'.
       
       // Only way to make this robust: refactor drawProfileImage to async OR pass loaded BG image.
       // Let's modify 'drawProfileImage' signature to accept 'backgroundImage?: HTMLImageElement'.
       // But that touches too many files.
       
       // Alternative: For now, if type is 'image', we fill white (fallback)
       // The user will see white until we implement async drawing.
       // Let's leave it as is for a moment and focus on the UI part, 
       // but we need to fix this or the feature is broken.
       
       // Let's DO refactor drawProfileImage to be async? No, 'useEffect' in preview uses it sync.
       
       // Best path: Pass 'backgroundImageElement' to DrawOptions.
  }
  
  if (gradient.enabled) {
    // Custom Gradient Mode
    const coords = getGradientCoords(size, size, gradient.angle)
    const grd = ctx.createLinearGradient(coords.x0, coords.y0, coords.x1, coords.y1)
    grd.addColorStop(0, gradient.color1)
    grd.addColorStop(1, gradient.color2)
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, size, size)
  } else {
    // Preset Mode
    if (background.value !== 'transparent') {
      if (background.type === 'image' && backgroundImage) {
          // Draw custom background image
          // Cover mode
          const scale = Math.max(size / backgroundImage.width, size / backgroundImage.height)
          const x = (size / 2) - (backgroundImage.width / 2) * scale
          const y = (size / 2) - (backgroundImage.height / 2) * scale
          ctx.drawImage(backgroundImage, x, y, backgroundImage.width * scale, backgroundImage.height * scale)
      } else if (background.type === 'gradient') {
          if (background.id.startsWith('grad')) {
              // Simple extraction for presets
              const colors = background.value.match(/#[0-9a-fA-F]{6}/g)
              if (colors && colors.length >= 2) {
                  const grd = ctx.createLinearGradient(0, 0, size, size)
                  grd.addColorStop(0, colors[0])
                  grd.addColorStop(1, colors[1])
                  ctx.fillStyle = grd
              } else {
                  ctx.fillStyle = '#ffffff'
              }
          } else {
              ctx.fillStyle = background.value
          }
      } else {
           ctx.fillStyle = background.value
      }
      ctx.fillRect(0, 0, size, size)
    }
  }

  // 3b. Pattern Overlay
  if (background.texture && background.texture !== 'none') {
      ctx.save()
      const patternCanvas = document.createElement('canvas')
      const pCtx = patternCanvas.getContext('2d')
      
      if (pCtx) {
        ctx.globalAlpha = background.textureOpacity || 0.1
        
        if (background.texture === 'dots') {
             patternCanvas.width = 20
             patternCanvas.height = 20
             pCtx.fillStyle = '#000000'
             pCtx.beginPath()
             pCtx.arc(2, 2, 1, 0, Math.PI * 2)
             pCtx.fill()
             const pattern = ctx.createPattern(patternCanvas, 'repeat')
             if (pattern) {
                 ctx.fillStyle = pattern
                 ctx.fillRect(0, 0, size, size)
             }
        } else if (background.texture === 'grid') {
            patternCanvas.width = 40
            patternCanvas.height = 40
            pCtx.strokeStyle = '#000000'
            pCtx.lineWidth = 1
            pCtx.beginPath()
            pCtx.moveTo(0, 0)
            pCtx.lineTo(40, 0)
            pCtx.moveTo(0, 0)
            pCtx.lineTo(0, 40)
            pCtx.stroke()
            const pattern = ctx.createPattern(patternCanvas, 'repeat')
             if (pattern) {
                 ctx.fillStyle = pattern
                 ctx.fillRect(0, 0, size, size)
             }
        } else if (background.texture === 'lines') {
            patternCanvas.width = 20
            patternCanvas.height = 20
            pCtx.strokeStyle = '#000000'
            pCtx.lineWidth = 1
            pCtx.beginPath()
            pCtx.moveTo(0, 20)
            pCtx.lineTo(20, 0)
            pCtx.stroke()
            const pattern = ctx.createPattern(patternCanvas, 'repeat')
             if (pattern) {
                 ctx.fillStyle = pattern
                 ctx.fillRect(0, 0, size, size)
             }
        } else if (background.texture === 'noise') {
            const noiseSize = 64
            const noiseCanvas = document.createElement('canvas')
            noiseCanvas.width = noiseSize
            noiseCanvas.height = noiseSize
            const nCtx = noiseCanvas.getContext('2d')
            if (nCtx) {
                const idata = nCtx.createImageData(noiseSize, noiseSize)
                const buffer32 = new Uint32Array(idata.data.buffer)
                for (let i = 0; i < buffer32.length; i++) {
                    if (Math.random() < 0.5) buffer32[i] = 0xff000000
                }
                nCtx.putImageData(idata, 0, 0)
                const pattern = ctx.createPattern(noiseCanvas, 'repeat')
                if (pattern) {
                    ctx.fillStyle = pattern
                    ctx.fillRect(0, 0, size, size)
                }
            }
        }
        
        ctx.globalAlpha = 1.0
      }
      ctx.restore()
  }

  // 3c. Decal Overlay
  if (background.decal && background.decal !== 'none' && decalImage) {
      ctx.save()
      ctx.globalAlpha = background.decalOpacity || 1.0
      ctx.drawImage(decalImage, 0, 0, size, size)
      ctx.restore()
  }

  // 4. Draw Image (Subject)
  
  // Calculate Transforms
  const originX = (size * positionX) / 100
  const originY = (size * positionY) / 100
  
  // Object Cover Logic Calculation for Draw dimensions
  const imgAspect = image.width / image.height
  const canvasAspect = 1
  let drawWidth, drawHeight, drawX, drawY
  
  if (imgAspect > canvasAspect) {
    drawHeight = size
    drawWidth = drawHeight * imgAspect
    drawX = (size - drawWidth) / 2
    drawY = 0
  } else {
    drawWidth = size
    drawHeight = drawWidth / imgAspect
    drawX = 0
    drawY = (size - drawHeight) / 2
  }
  
  // Apply Transforms & Draw
  ctx.save()
  
  ctx.translate(originX, originY)
  ctx.scale(zoom / 100, zoom / 100)
  ctx.rotate((rotation * Math.PI) / 180)
  ctx.translate(-originX, -originY)

  // 4a. Apply Subject Filters
  const filterString = [
      `brightness(${filters.brightness}%)`,
      `contrast(${filters.contrast}%)`,
      `saturate(${filters.saturation}%)`,
      `grayscale(${filters.grayscale}%)`
  ].join(' ')
  
  // 4b. Apply Subject Outline (The "Sticker" effect)
  // We use drop-shadows to simulate stroke
  if (outline.width > 0) {
      const w = scaledOutlineWidth
      const c = outline.color
      // 8-point stroke approximation for robustness
      const shadowFilters = [
          `drop-shadow(${w}px 0 0 ${c})`,
          `drop-shadow(-${w}px 0 0 ${c})`,
          `drop-shadow(0 ${w}px 0 ${c})`,
          `drop-shadow(0 -${w}px 0 ${c})`,
          `drop-shadow(${w*0.7}px ${w*0.7}px 0 ${c})`,
          `drop-shadow(-${w*0.7}px ${w*0.7}px 0 ${c})`,
          `drop-shadow(${w*0.7}px -${w*0.7}px 0 ${c})`,
          `drop-shadow(-${w*0.7}px -${w*0.7}px 0 ${c})`
      ].join(' ')
      
      ctx.filter = `${filterString} ${shadowFilters}`
  } else {
      ctx.filter = filterString
  }

  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight)
  ctx.restore()

  ctx.restore() // End Clip

  // 5. Draw Frame Border (on top of everything)
  if (borderWidth > 0) {
    ctx.save()
    ctx.beginPath()
    const inset = scaledBorder / 2 
    
    if (shape === 'circle') {
      ctx.arc(size / 2, size / 2, (size / 2) - inset, 0, Math.PI * 2)
    } else if (shape === 'squircle') {
      const r = size * 0.2
      ctx.roundRect(inset, inset, size - (inset * 2), size - (inset * 2), r)
    } else {
      ctx.rect(inset, inset, size - (inset * 2), size - (inset * 2))
    }
    
    ctx.lineWidth = scaledBorder
    ctx.strokeStyle = borderColor
    ctx.stroke()
    ctx.restore()
  }
}

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation)

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}

export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  rotation = 0,
  flip = { horizontal: false, vertical: false }
): Promise<File | null> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return null
  }

  const rotRad = getRadianAngle(rotation)

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  )

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth
  canvas.height = bBoxHeight

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
  ctx.rotate(rotRad)
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
  ctx.translate(-image.width / 2, -image.height / 2)

  // draw rotated image
  ctx.drawImage(image, 0, 0)

  // croppedAreaPixels values are bounding box relative
  // extract the cropped image using these values
  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  )

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  // paste generated rotate image at the top left corner
  ctx.putImageData(data, 0, 0)

  // As a Blob
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
        if (!blob) {
            resolve(null) 
            return
        }
        resolve(new File([blob], 'cropped.png', { type: 'image/png' }))
    }, 'image/png')
  })
}
