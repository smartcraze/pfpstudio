import { NextRequest, NextResponse } from 'next/server'
import dbConnect from "@/lib/db";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

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
    const session = await getServerSession(authOptions);
    
    let userApiKey = null;
    
    if (session && session.user) {
        await dbConnect();
        // @ts-ignore
        const user = await User.findById(session.user.id);
        if (user && user.removeBgKey) {
            userApiKey = user.removeBgKey;
        }
    }
  
    const formData = await request.formData()
    const file = formData.get('image') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const apiKey = userApiKey || process.env.REMOVE_BG_API_KEY
    
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'Remove.bg API key not configured' 
      }, { status: 500 })
    }

    // Attempt to use the selected API key
    let rbgResultData;
    let fallbackUsed = false;
    
    try {
      rbgResultData = await removeBg(file, apiKey);
    } catch (apiError: any) {
      // If it fails and it was a user key, we fall back to the system key
      if (userApiKey && process.env.REMOVE_BG_API_KEY) {
        console.warn(`User key failed: ${apiError.message}. Falling back to system key.`);
        try {
          rbgResultData = await removeBg(file, process.env.REMOVE_BG_API_KEY);
          fallbackUsed = true;
          
          // Optionally, we could delete their invalid key from DB here so they
          // know it's broken, or just inform them on the frontend.
          if (session && session.user) {
            // @ts-ignore
            await User.findByIdAndUpdate(session.user.id, { $unset: { removeBgKey: "" } });
          }
        } catch (fallbackError) {
          throw new Error('Both custom and system API keys failed.');
        }
      } else {
        throw apiError; // Throw original error if no fallback possible
      }
    }
    
    // Convert array buffer to base64 data URL
    const base64 = Buffer.from(rbgResultData).toString('base64')
    const dataUrl = `data:image/png;base64,${base64}`

    return NextResponse.json({
      success: true,
      processedImage: dataUrl,
      // If we fell back, they didn't really use their own key successfully
      usedOwnKey: !!userApiKey && !fallbackUsed, 
      fallbackUsed,
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