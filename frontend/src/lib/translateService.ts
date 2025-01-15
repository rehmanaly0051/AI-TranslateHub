import api from './api';

// Define the expected error response structure
interface ApiError {
  response?: {
    data?: {
      error?: string;
    };
  };
  message: string;
}

export const translateText = async (text: string, srcLang: string, tgtLang: string) => {
  try {
    const response = await api.post('translate/', {
      text: text.trim(),     // ✅ Matches Django's 'text' field
      src_lang: srcLang,     // ✅ Matches Django's 'src_lang' field
      tgt_lang: tgtLang,     // ✅ Matches Django's 'tgt_lang' field
    });

    return response.data.translated_text;
  } catch (error) {
    const err = error as ApiError;  // Type assertion for better safety
    console.error('Translation Error:', err.response?.data?.error || err.message);
    throw new Error(err.response?.data?.error || 'Translation failed.');
  }
};
