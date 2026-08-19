import React, { useState, useRef, useEffect } from 'react';
import { Bot } from 'lucide-react';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import { chatMessages, chatSuggestions } from '../data/mockData';
import { sendChatMessage } from '../services/chatService';
import { useTranslation } from '../i18n';

export default function Chat() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState(chatMessages || []);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMsg = { sender: 'user', text, timestamp: new Date().toISOString() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      const response = await sendChatMessage(userMsg, updatedMessages);
      setMessages([...updatedMessages, response]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="page-container h-[calc(100vh-80px)] flex flex-col animate-fade-in">
      <div className="card p-4 mb-4 flex items-center gap-4 shrink-0">
        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
          <Bot size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{t('chat.title')}</h1>
          <p className="text-surface-500 text-base">{t('chat.subtitle')}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 bg-surface-50 rounded-xl p-4 shadow-inner">
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} message={msg} />
          ))}
          {isTyping && (
            <div className="flex gap-2 p-3 bg-white rounded-lg shadow-sm w-max">
              <span className="w-2 h-2 bg-surface-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="shrink-0 mb-4 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
        <div className="flex gap-2">
          {chatSuggestions && chatSuggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(suggestion)}
              disabled={isTyping}
              className="px-4 py-2 bg-white border border-surface-200 rounded-full text-base font-medium hover:bg-surface-100 hover:border-surface-300 transition-colors disabled:opacity-50"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div className="shrink-0">
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
}
