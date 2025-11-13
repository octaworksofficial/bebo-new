// Client-side utility functions for chat

// Generate or retrieve chat session ID
export function generateChatSessionId(userId: string, productSlug?: string): string {
  // Create a session ID based on user + product + timestamp
  const timestamp = Date.now();
  const base = productSlug ? `${userId}-${productSlug}` : userId;
  return `${base}-${timestamp}`;
}
