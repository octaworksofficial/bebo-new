export type MockupType = 'frame' | 'overlay' | 'perspective' | 'none';

export type MockupConfig = {
  type?: MockupType; // Mockup tipi (frame, overlay, perspective, none)
  x: number; // Sol pozisyon (%)
  y: number; // Üst pozisyon (%)
  width: number; // Genişlik (%)
  height: number; // Yükseklik (%)
  rotation?: number; // Döndürme açısı (derece)
  perspective?: number; // Perspektif açısı
  skewX?: number; // X eğimi
  skewY?: number; // Y eğimi
};

/**
 * Parse mockup config from JSON string
 */
export function parseMockupConfig(configString: string | null): MockupConfig {
  const defaultConfig: MockupConfig = {
    type: 'frame',
    x: 10,
    y: 10,
    width: 80,
    height: 80,
    rotation: 0,
    perspective: 0,
    skewX: 0,
    skewY: 0,
  };

  if (!configString) {
    return defaultConfig;
  }

  try {
    const parsed = JSON.parse(configString);
    return { ...defaultConfig, ...parsed };
  } catch {
    return defaultConfig;
  }
}

/**
 * Validate mockup type
 */
export function validateMockupType(type: string | null): MockupType {
  const validTypes: MockupType[] = ['frame', 'overlay', 'perspective', 'none'];
  if (type && validTypes.includes(type as MockupType)) {
    return type as MockupType;
  }
  return 'none';
}
