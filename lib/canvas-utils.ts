import { BackgroundPreset, ShapeType } from '@/components/profile-editor/types'

interface DrawOptions {
  canvas: HTMLCanvasElement
  image: HTMLImageElement
  shape: ShapeType
  background: BackgroundPreset
  zoom: number
  rotation: number
  positionX: number
  positionY: number
  size: number
  borderColor: string
  borderWidth: number
  shadowIntensity: number
}

export const drawProfileImage = ({
  canvas,
  image,
  shape,
  background,
  zoom,
  rotation,
  positionX,
  positionY,
  size,
  borderColor,
  borderWidth,
  shadowIntensity
}: DrawOptions) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = size
  canvas.height = size
  
  ctx.clearRect(0, 0, size, size)
  
  // Scale border and shadow relative to export size (assuming preview is ~320px)
  const scaleFactor = size / 320
  const scaledBorder = borderWidth * scaleFactor
  const scaledShadow = shadowIntensity * scaleFactor

  // 1. Draw Shadow (if any)
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
    ctx.shadowColor = 'rgba(0,0,0,0.5)'
    ctx.shadowBlur = scaledShadow * 2
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = scaledShadow / 2
    ctx.fillStyle = '#000000' // Shadow fill color
    ctx.fill()
    ctx.restore()
  }

  // 2. Define Main Shape Path (for clipping and filling)
  // We inset slightly if there is a border to keep it inside or centered? 
  // Standard profile pics usually have border 'inside' or 'centered'. 
  // Let's clip to the full size minus margin if needed, or just full size.
  // To keep it simple: Shape is full size. Border draws ON TOP.
  
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

  if (background.value !== 'transparent') {
    if (background.type === 'gradient') {
        if (background.id.startsWith('grad')) {
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

  // 3. Draw Image with Transforms
  const originX = (size * positionX) / 100
  const originY = (size * positionY) / 100
  
  ctx.translate(originX, originY)
  ctx.scale(zoom / 100, zoom / 100)
  ctx.rotate((rotation * Math.PI) / 180)
  ctx.translate(-originX, -originY)
  
  // Object Cover Logic
  const imgAspect = image.width / image.height
  const canvasAspect = 1 // Square
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
  
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight)
  ctx.restore()

  // 4. Draw Border (if any)
  if (borderWidth > 0) {
    ctx.save()
    ctx.beginPath()
    const inset = scaledBorder / 2 // Stroke centers on path.
    
    // We stroke inside/center. To make it look clean:
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
