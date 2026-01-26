import { BackgroundPreset, ShapeType, ImageFilterState, OutlineState, GradientState } from '@/components/profile-editor/types'

interface DrawOptions {
  canvas: HTMLCanvasElement
  image: HTMLImageElement
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
      if (background.type === 'gradient') {
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

  // 3a. Noise Texture (Optional Senior Feature)
  if (noiseTexture) {
    ctx.save()
    // Simple noise generation
    const noiseSize = 64
    const noiseCanvas = document.createElement('canvas')
    noiseCanvas.width = noiseSize
    noiseCanvas.height = noiseSize
    const nCtx = noiseCanvas.getContext('2d')
    if (nCtx) {
        const idata = nCtx.createImageData(noiseSize, noiseSize)
        const buffer32 = new Uint32Array(idata.data.buffer)
        for (let i = 0; i < buffer32.length; i++) {
             if (Math.random() < 0.5) buffer32[i] = 0xff000000 // Black with alpha set later
        }
        nCtx.putImageData(idata, 0, 0)
        ctx.globalAlpha = 0.05
        ctx.fillStyle = ctx.createPattern(noiseCanvas, 'repeat') || ''
        ctx.fillRect(0, 0, size, size)
    }
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
