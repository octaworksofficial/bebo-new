// Client-side image upload utility
// This runs in the browser, not on the server

export type UploadImageResponse = {
  image_url: string;
  thumb_url: string;
};

export async function uploadImageToN8n(imageFile: File): Promise<{
  success: boolean;
  imageUrl?: string;
  error?: string;
}> {
  try {
    // Create FormData
    const formData = new FormData();
    formData.append('image', imageFile);

    const n8nUrl = `${process.env.N8N_WEBHOOK_URL || 'https://n8n-production-14b9.up.railway.app'}${process.env.N8N_WEBHOOK_UPLOAD_IMAGE || '/webhook/upload-image'}`;
    const response = await fetch(n8nUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Upload error response:', errorText);
      throw new Error(`Upload failed with status ${response.status}: ${errorText}`);
    }

    const responseText = await response.text();
    console.log('Upload response:', responseText);
    
    // Try to parse as JSON
    let data: UploadImageResponse;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', responseText);
      throw new Error('API yanıtı JSON formatında değil');
    }

    // Check if image_url exists
    if (!data.image_url) {
      console.error('Response data:', data);
      throw new Error('API yanıtında image_url bulunamadı');
    }

    return {
      success: true,
      imageUrl: data.image_url,
    };
  } catch (error) {
    console.error('Image upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Görsel yüklenemedi',
    };
  }
}
