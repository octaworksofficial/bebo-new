'use server';

import { currentUser } from '@clerk/nextjs/server';
import { getProductIdsFromSlugs } from '@/features/products/productActions';

export type ChatRequest = {
  userId: string;
  chatSessionId: string;
  creditUsed: number;
  imagePrompt: boolean;
  imagePromptUrl: string;
  textPrompt: string;
  aiModel: string;
  resolution: string;
  quality: string;
  style: string;
  productSlug: string;
  sizeSlug: string;
  frameSlug: string;
  productId: number | null;
  sizeId: number | null;
  frameId: number | null;
};

export type ChatResponse = {
  reply_to_user: string;
  image_generation: boolean;
  generation_id: string;
};

export async function sendChatMessage(params: {
  textPrompt: string;
  imagePromptUrl?: string;
  isGenerateMode: boolean;
  chatSessionId: string;
  productSlug?: string;
  sizeSlug?: string;
  frameSlug?: string;
}) {
  try {
    // Get authenticated user
    const user = await currentUser();
    
    if (!user) {
      return {
        success: false,
        error: 'Kullanıcı oturumu bulunamadı. Lütfen giriş yapın.',
      };
    }

    // Get product, size, and frame IDs from slugs
    const { productId, sizeId, frameId } = await getProductIdsFromSlugs({
      productSlug: params.productSlug,
      sizeSlug: params.sizeSlug,
      frameSlug: params.frameSlug,
    });

    // Prepare request body
    const requestBody: ChatRequest = {
      userId: user.id,
      chatSessionId: params.chatSessionId,
      creditUsed: params.isGenerateMode ? 2 : 1, // Generate mode uses more credits
      imagePrompt: !!params.imagePromptUrl,
      imagePromptUrl: params.imagePromptUrl || '',
      textPrompt: params.textPrompt,
      aiModel: 'gpt1',
      resolution: '1024x1024',
      quality: 'low',
      style: '',
      productSlug: params.productSlug || '',
      sizeSlug: params.sizeSlug || '',
      frameSlug: params.frameSlug || '',
      productId,
      sizeId,
      frameId,
    };

    // Convert to API format (kebab-case keys)
    const apiBody = {
      'user-id': requestBody.userId,
      'chat-session-id': requestBody.chatSessionId,
      'credit-used': requestBody.creditUsed,
      'image-prompt': requestBody.imagePrompt,
      'image-prompt-url': requestBody.imagePromptUrl,
      'text-prompt': requestBody.textPrompt,
      'ai-model': requestBody.aiModel,
      'is-generate-mode': params.isGenerateMode,
      resolution: requestBody.resolution,
      quality: requestBody.quality,
      style: requestBody.style,
      'product-slug': requestBody.productSlug,
      'size-slug': requestBody.sizeSlug,
      'frame-slug': requestBody.frameSlug,
      'product-id': requestBody.productId,
      'product-size-id': requestBody.sizeId,
      'product-frame-id': requestBody.frameId,
    };

    // Send to n8n webhook
    const response = await fetch('https://n8n-production-14b9.up.railway.app/webhook/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiBody),
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data: ChatResponse = await response.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Chat API error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Bir hata oluştu',
    };
  }
}

export type GeneratedImageResponse = {
  id: number;
  user_id: string;
  chat_session_id: string;
  generation_id: string;
  product_id: number;
  product_size_id: number;
  product_frame_id: number;
  text_prompt: string;
  improved_prompt: string;
  image_url: string;
  uploaded_image_url: string;
  user_generation_intent: string;
  is_generate_mode: boolean;
  credit_used: number;
  is_selected: boolean;
  updated_at: string;
  created_at: string;
};

export async function getGeneratedImage(generationId: string) {
  try {
    // Convert generation_id to number
    const generationIdNumber = parseInt(generationId, 10);
    
    if (isNaN(generationIdNumber)) {
      throw new Error('Invalid generation_id format');
    }
    
    const response = await fetch('https://n8n-production-14b9.up.railway.app/webhook/getGeneratedImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'generation-id': generationIdNumber,
      }),
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const dataArray: GeneratedImageResponse[] = await response.json();
    
    // Return first item from array (or null if array is empty)
    const data = dataArray.length > 0 ? dataArray[0] : null;

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get generated image error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Görsel alınamadı',
    };
  }
}

export async function getUserGeneratedImages() {
  try {
    // Get authenticated user
    const user = await currentUser();
    
    if (!user) {
      return {
        success: false,
        error: 'Kullanıcı oturumu bulunamadı.',
      };
    }

    const response = await fetch('https://n8n-production-14b9.up.railway.app/webhook/getGeneratedImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'user_id': user.id,
      }),
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data: GeneratedImageResponse[] = await response.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Get user images error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Görseller alınamadı',
    };
  }
}
