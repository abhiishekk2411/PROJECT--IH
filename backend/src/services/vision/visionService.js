/**
 * Analyzes a crop image using OpenRouter Vision Model.
 * @param {Buffer} imageBuffer - The image file buffer.
 * @param {string} mimeType - The mime type of the image.
 * @returns {Object} Extracted crop info
 */
const analyzeCropImage = async (imageBuffer, mimeType) => {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error('OpenRouter API Key is missing. Cannot perform image analysis.');
  }

  const model = process.env.OPENROUTER_MODEL || 'google/gemini-2.5-flash';

  const prompt = `
You are a crop identification assistant for Indian farmers.
Analyze only the visible crop/plant/produce in the image.
Identify the most likely crop.
Identify variety only when there is sufficient visual evidence.
Do not guess unsupported details.
Return JSON only.
Do not provide medical, pesticide, fertilizer or agricultural treatment advice.

Expected JSON structure:
{
  "cropId": "tomato",
  "cropName": "Tomato",
  "varietyId": "hybrid",
  "varietyName": "Hybrid",
  "confidence": 0.91
}

If variety cannot be identified, set varietyId and varietyName to null.
If crop cannot be confidently identified, set all fields to null and confidence to 0.
Return only valid JSON, without any markdown formatting block.
`;

  try {
    const base64Image = imageBuffer.toString('base64');
    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    // Add a reasonable timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt
              },
              {
                type: "image_url",
                image_url: {
                  url: dataUrl
                }
              }
            ]
          }
        ]
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`OpenRouter API Error: ${response.status} ${response.statusText}`);
      throw new Error(`OpenRouter API Error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      throw new Error('Invalid response structure from OpenRouter');
    }

    let resultText = data.choices[0].message.content.trim();
    // Clean up potential markdown formatting
    if (resultText.startsWith('```json')) {
      resultText = resultText.substring(7);
      if (resultText.endsWith('```')) {
        resultText = resultText.substring(0, resultText.length - 3);
      }
    } else if (resultText.startsWith('```')) {
      resultText = resultText.substring(3);
      if (resultText.endsWith('```')) {
        resultText = resultText.substring(0, resultText.length - 3);
      }
    }

    const jsonResult = JSON.parse(resultText);
    return {
      cropId: jsonResult.cropId || null,
      cropName: jsonResult.cropName || null,
      varietyId: jsonResult.varietyId || null,
      varietyName: jsonResult.varietyName || null,
      confidence: jsonResult.confidence || 0
    };

  } catch (error) {
    console.error('Vision API Error:', error);
    throw new Error('Failed to analyze image with OpenRouter Vision');
  }
};

module.exports = {
  analyzeCropImage
};
