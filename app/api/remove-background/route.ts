import { NextRequest, NextResponse } from 'next/server'

async function removeBg(blob: Blob, apiKey: string) {
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_file", blob);

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": apiKey },
    body: formData,
  });

  if (response.ok) {
    return await response.arrayBuffer();
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('image') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const apiKey = process.env.REMOVE_BG_API_KEY
    
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'Remove.bg API key not configured' 
      }, { status: 500 })
    }

    // Use the remove.bg API
    const rbgResultData = await removeBg(file, apiKey);
    
    // Convert array buffer to base64 data URL
    const base64 = Buffer.from(rbgResultData).toString('base64')
    const dataUrl = `data:image/png;base64,${base64}`

    return NextResponse.json({
      success: true,
      processedImage: dataUrl,
      message: 'Background removed successfully'
    })
  } catch (error) {
    console.error('Background removal error:', error)
    return NextResponse.json(
      { error: 'Failed to process image', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}