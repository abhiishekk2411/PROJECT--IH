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

  // Mock responses based on keywords
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes('mandi') || lowerMsg.includes('best') || lowerMsg.includes('which')) {
    return {
      id: `c-${Date.now()}`,
      sender: 'assistant',
      text: 'Based on current market prices, distance and estimated transport cost, Pimpalgaon Mandi currently gives the highest expected net return of ₹17,920 for your crop. The price trend there is also increasing.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }

  if (lowerMsg.includes('sell') || lowerMsg.includes('wait')) {
    return {
      id: `c-${Date.now()}`,
      sender: 'assistant',
      text: 'I recommend selling now. There is moderate rain risk in the next 48 hours, and the current price trend at Pimpalgaon is favorable. Waiting carries weather-related risk.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }

  if (lowerMsg.includes('weather') || lowerMsg.includes('rain')) {
    return {
      id: `c-${Date.now()}`,
      sender: 'assistant',
      text: 'Current weather in Nashik shows 65% rain probability with heavy rainfall possible in the next 48 hours. This is a moderate risk signal. I recommend factoring this into your selling decision.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }

  if (lowerMsg.includes('price') || lowerMsg.includes('market')) {
    return {
      id: `c-${Date.now()}`,
      sender: 'assistant',
      text: 'Here are the current tomato prices near Nashik:\n• Pimpalgaon: ₹24/kg (↑ Increasing)\n• Lasalgaon: ₹23/kg (→ Stable)\n• Sinnar: ₹26/kg (↓ Decreasing)\n• Dindori: ₹25/kg (↑ Increasing)\n• Manmad: ₹22/kg (→ Stable)',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }

  return {
    id: `c-${Date.now()}`,
    sender: 'assistant',
    text: 'I can help you find the best mandi, check market prices, assess weather risk, and decide whether to sell now or wait. What would you like to know?',
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
