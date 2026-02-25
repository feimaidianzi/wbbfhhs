// Supported languages configuration
export type LanguageCode = 
  | 'zh'   // Chinese (Simplified)
  | 'en'   // English
  | 'vi'   // Vietnamese
  | 'th'   // Thai
  | 'ms'   // Malay
  | 'id'   // Indonesian
  | 'ja'   // Japanese
  | 'ko'   // Korean
  | 'fr'   // French
  | 'de'   // German
  | 'es'   // Spanish
  | 'ru'   // Russian
  | 'ar'   // Arabic
  | 'tr';  // Turkish

export interface LanguageConfig {
  code: LanguageCode;
  name: string;        // Native name
  nameEn: string;      // English name
  flag: string;        // Emoji flag
  region: 'asia' | 'europe' | 'middle-east';
  rtl?: boolean;       // Right-to-left
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  // East Asia
  { code: 'zh', name: '中文', nameEn: 'Chinese', flag: '🇨🇳', region: 'asia' },
  { code: 'en', name: 'English', nameEn: 'English', flag: '🇺🇸', region: 'europe' },
  { code: 'ja', name: '日本語', nameEn: 'Japanese', flag: '🇯🇵', region: 'asia' },
  { code: 'ko', name: '한국어', nameEn: 'Korean', flag: '🇰🇷', region: 'asia' },
  
  // Southeast Asia
  { code: 'vi', name: 'Tiếng Việt', nameEn: 'Vietnamese', flag: '🇻🇳', region: 'asia' },
  { code: 'th', name: 'ไทย', nameEn: 'Thai', flag: '🇹🇭', region: 'asia' },
  { code: 'ms', name: 'Bahasa Melayu', nameEn: 'Malay', flag: '🇲🇾', region: 'asia' },
  { code: 'id', name: 'Bahasa Indonesia', nameEn: 'Indonesian', flag: '🇮🇩', region: 'asia' },
  
  // Europe
  { code: 'fr', name: 'Français', nameEn: 'French', flag: '🇫🇷', region: 'europe' },
  { code: 'de', name: 'Deutsch', nameEn: 'German', flag: '🇩🇪', region: 'europe' },
  { code: 'es', name: 'Español', nameEn: 'Spanish', flag: '🇪🇸', region: 'europe' },
  { code: 'ru', name: 'Русский', nameEn: 'Russian', flag: '🇷🇺', region: 'europe' },
  
  // Middle East
  { code: 'ar', name: 'العربية', nameEn: 'Arabic', flag: '🇸🇦', region: 'middle-east', rtl: true },
  { code: 'tr', name: 'Türkçe', nameEn: 'Turkish', flag: '🇹🇷', region: 'middle-east' },
];

export const getLanguageByCode = (code: string): LanguageConfig | undefined => {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code);
};

export const getLanguagesByRegion = (region: LanguageConfig['region']): LanguageConfig[] => {
  return SUPPORTED_LANGUAGES.filter(lang => lang.region === region);
};

export const DEFAULT_LANGUAGE: LanguageCode = 'en';
export const FALLBACK_LANGUAGE: LanguageCode = 'zh';

/**
 * Helper to convert any LanguageCode to a base language ('zh' | 'en')
 * Used for components that have hardcoded zh/en content
 */
export const toBaseLanguage = (lang: LanguageCode): 'zh' | 'en' => {
  return lang === 'zh' ? 'zh' : 'en';
};
