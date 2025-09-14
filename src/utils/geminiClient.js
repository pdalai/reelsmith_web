import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Initializes the Gemini client with the API key from environment variables.
 * @returns {GoogleGenerativeAI} Configured Gemini client instance.
 */
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

/**
 * Generates a text response based on user input.
 * @param {string} prompt - The user's input prompt.
 * @returns {Promise<string>} The generated text.
 */
export async function generateText(prompt) {
  try {
    if (!import.meta.env?.VITE_GEMINI_API_KEY) {
      throw new Error('VITE_GEMINI_API_KEY is not configured');
    }

    const model = genAI?.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model?.generateContent(prompt);
    const response = await result?.response;
    return response?.text();
  } catch (error) {
    console.error('Error in text generation:', error);
    throw error;
  }
}

/**
 * Analyzes an Instagram Reel URL and provides style insights
 * @param {string} url - The Instagram Reel URL
 * @returns {Promise<Object>} Analysis results with style description and tags
 */
export async function analyzeInstagramReel(url) {
  try {
    if (!import.meta.env?.VITE_GEMINI_API_KEY) {
      throw new Error('VITE_GEMINI_API_KEY is not configured');
    }

    const prompt = `Please analyze the Instagram Reel at this URL: ${url}

As an expert in social media content and video production, provide a detailed analysis of this Instagram Reel's style, visual elements, and content approach. 

Please respond in the following JSON format:
{
  "styleDescription": "A detailed description of the visual style, editing techniques, color grading, pacing, and overall aesthetic approach used in this reel. Include information about camera work, transitions, text overlays, music synchronization, and any unique creative elements.",
  "styleTags": ["Array of 5-8 specific style tags that categorize this content, such as 'Travel Vlog', 'Dynamic Cuts', 'Warm Tones', 'Text Overlays', 'Aspirational', etc."]
}

Focus on actionable insights that would help someone create similar content. Analyze the editing style, visual composition, color palette, pacing, and engagement techniques used.`;

    const model = genAI?.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    });
    
    const result = await model?.generateContent(prompt);
    const response = await result?.response;
    const text = response?.text();

    // Try to parse JSON response
    try {
      const jsonMatch = text?.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const analysisData = JSON.parse(jsonMatch?.[0]);
        return {
          styleDescription: analysisData?.styleDescription || text,
          styleTags: Array.isArray(analysisData?.styleTags) ? analysisData?.styleTags : [],
          reelUrl: url,
          timestamp: Date.now()
        };
      }
    } catch (parseError) {
      console.warn('Could not parse JSON response, using raw text:', parseError);
    }

    // Fallback: extract information from raw text
    return {
      styleDescription: text,
      styleTags: extractTagsFromText(text),
      reelUrl: url,
      timestamp: Date.now()
    };

  } catch (error) {
    console.error('Error analyzing Instagram Reel:', error);
    throw error;
  }
}

/**
 * Extracts potential style tags from text response
 * @param {string} text - The response text
 * @returns {Array<string>} Array of extracted tags
 */
function extractTagsFromText(text) {
  const commonTags = [
    'Travel Vlog', 'Lifestyle', 'Professional', 'Minimalist', 'Dynamic Cuts',
    'Warm Tones', 'Cool Tones', 'Text Overlays', 'Music Sync', 'High Energy',
    'Talking Head', 'Educational', 'Aspirational', 'Trending', 'Creative Angles',
    'Quick Transitions', 'Vibrant Colors', 'Natural Lighting', 'Urban Style'
  ];

  const foundTags = commonTags?.filter(tag => 
    text?.toLowerCase()?.includes(tag?.toLowerCase())
  );

  return foundTags?.length > 0 ? foundTags?.slice(0, 7) : ['Modern', 'Creative', 'Engaging'];
}

/**
 * Streams a text response chunk by chunk.
 * @param {string} prompt - The user's input prompt.
 * @param {Function} onChunk - Callback to handle each streamed chunk.
 */
export async function streamText(prompt, onChunk) {
  try {
    if (!import.meta.env?.VITE_GEMINI_API_KEY) {
      throw new Error('VITE_GEMINI_API_KEY is not configured');
    }

    const model = genAI?.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model?.generateContentStream(prompt);

    for await (const chunk of result?.stream) {
      const text = chunk?.text();
      if (text) {
        onChunk(text);
      }
    }
  } catch (error) {
    console.error('Error in streaming text generation:', error);
    throw error;
  }
}

export default genAI;