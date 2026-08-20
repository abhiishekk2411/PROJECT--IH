// ============================================================================
// Chat Service — FasalNirnay Frontend
// ============================================================================
// Handles chat/conversation with the Crop Assistant.
// Currently returns mock data. Replace with backend calls when ready.
// ============================================================================

import { chatMessages, chatSuggestions } from '../data/mockData';

/**
 * Send a message to the Crop Assistant and get a response.
 * TODO: Replace with POST /api/chat/message
 * @param {string} message - Farmer's message text
 * @param {Array} history - Previous messages for context
 * @returns {Object} Assistant's response message
 */
export async function sendChatMessage(message, history = []) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  let messageText = '';
  if (typeof message === 'string') {
    messageText = message;
  } else if (message && typeof message.text === 'string') {
    messageText = message.text;
  } else {
    console.error("Invalid chat message format:", message);
    return {
      id: `c-${Date.now()}`,
      sender: 'assistant',
      text: 'माफ़ करें, मुझे आपका संदेश समझ नहीं आया। कृपया फिर से प्रयास करें। (Sorry, I did not understand your message. Please try again.)',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }

  // Mock responses based on keywords
  const lowerMsg = messageText.toLowerCase();

  if (lowerMsg.includes('mandi') || lowerMsg.includes('best') || lowerMsg.includes('which') || lowerMsg.includes('मंडी')) {
    return {
      id: `c-${Date.now()}`,
      sender: 'assistant',
      text: 'Based on current market prices, distance and estimated transport cost, Pimpalgaon Mandi currently gives the highest expected net return of ₹17,920 for your crop. The price trend there is also increasing.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }

  if (lowerMsg.includes('sell') || lowerMsg.includes('wait') || lowerMsg.includes('बेचना') || lowerMsg.includes('रुको') || lowerMsg.includes('इंतजार')) {
    return {
      id: `c-${Date.now()}`,
      sender: 'assistant',
      text: 'I recommend selling now. There is moderate rain risk in the next 48 hours, and the current price trend at Pimpalgaon is favorable. Waiting carries weather-related risk. (मेरी सलाह है कि अभी बेच दें। मौसम और मंडी के भाव को देखते हुए इंतज़ार करने में जोखिम है।)',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }

  if (lowerMsg.includes('weather') || lowerMsg.includes('rain') || lowerMsg.includes('मौसम') || lowerMsg.includes('बारिश')) {
    return {
      id: `c-${Date.now()}`,
      sender: 'assistant',
      text: 'Current weather in Nashik shows 65% rain probability with heavy rainfall possible in the next 48 hours. This is a moderate risk signal. (नासिक में अगले 48 घंटों में बारिश की 65% संभावना है। यह मध्यम जोखिम है।)',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }

  if (lowerMsg.includes('price') || lowerMsg.includes('market') || lowerMsg.includes('भाव') || lowerMsg.includes('कीमत')) {
    return {
      id: `c-${Date.now()}`,
      sender: 'assistant',
      text: 'Here are the current tomato prices near Nashik:\n• Pimpalgaon: ₹24/kg (↑ Increasing)\n• Lasalgaon: ₹23/kg (→ Stable)\n• Sinnar: ₹26/kg (↓ Decreasing)\n• Dindori: ₹25/kg (↑ Increasing)\n• Manmad: ₹22/kg (→ Stable)\n\n(नासिक के आसपास मंडियों में टमाटर का वर्तमान भाव ऊपर दिया गया है।)',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }

  return {
    id: `c-${Date.now()}`,
    sender: 'assistant',
    text: 'I can help you find the best mandi, check market prices, assess weather risk, and decide whether to sell now or wait. What would you like to know? (मैं आपको सबसे अच्छी मंडी खोजने, भाव देखने और मौसम का जोखिम समझने में मदद कर सकता हूँ। आप क्या जानना चाहते हैं?)',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

/**
 * Get initial chat messages for display.
 * @returns {Array} Initial messages
 */
export function getInitialMessages() {
  return chatMessages;
}

/**
 * Get suggestion chips for the chat.
 * @returns {Array} Suggestion strings
 */
export function getSuggestions() {
  return chatSuggestions;
}
