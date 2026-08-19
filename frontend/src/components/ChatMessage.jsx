import React from 'react';
import { Bot } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 mr-3 mt-1">
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-600" />
          </div>
        </div>
      )}
      
      <div className={`max-w-[80%] ${isUser ? 'order-1' : 'order-2'}`}>
        <div 
          className={`px-4 py-3 rounded-2xl shadow-sm whitespace-pre-wrap text-base md:text-lg ${
            isUser 
              ? 'bg-primary-600 text-white rounded-tr-sm' 
              : 'bg-white border border-surface-200 text-surface-900 rounded-tl-sm'
          }`}
        >
          {message.text}
        </div>
        <div className={`text-sm text-surface-400 mt-1 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
          {message.timestamp}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
