import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Minimize2, MessageCircle, Sparkles, AlertTriangle } from 'lucide-react';
import { useUser } from '../context/UserContext';

const AIChatbot = () => {
  const { user, quizResults } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: `Hello${user?.name ? ` ${user.name}` : ''}! 👋 I'm your **AI career advisor** powered by Gemini. Ask me about courses, colleges, careers, scholarships, or entrance exams — I'm here to help!`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Build user context from profile & quiz data
  const getUserContext = () => {
    const ctx = {};
    if (user?.name) ctx.name = user.name;
    if (user?.stream || quizResults?.recommendedStream)
      ctx.stream = user?.stream || quizResults?.recommendedStream;
    if (user?.currentClass) ctx.currentClass = user.currentClass;
    if (user?.location) ctx.location = user.location;
    if (user?.interests?.length) ctx.interests = user.interests;
    return Object.keys(ctx).length > 0 ? ctx : undefined;
  };

  // Convert message history to the format expected by the backend
  const getHistory = () => {
    return messages
      .filter((m) => m.id !== 1) // skip the initial greeting
      .map((m) => ({
        role: m.type === 'user' ? 'user' : 'bot',
        content: m.content,
      }));
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);
    setError(null);

    try {
      const response = await fetch('https://sih-backend.onrender.com/api/v1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          history: getHistory(),
          userContext: getUserContext(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get response');
      }

      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: data.data.reply,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (err) {
      console.error('Chat error:', err);
      setError('Failed to get a response. Please try again.');
      // Add an error message bubble so user sees the issue
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: 'bot',
          content: "I'm sorry, I couldn't process your request right now. Please try again in a moment.",
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Simple markdown-like rendering for bold text and bullet points
  const renderContent = (content) => {
    // Split by **bold** markers
    const parts = content.split(/(\*\*.*?\*\*)/g);
    const rendered = parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    // Split by newlines and render as paragraphs
    const text = rendered.reduce((acc, part, i) => {
      if (typeof part === 'string') {
        const lines = part.split('\n');
        lines.forEach((line, j) => {
          acc.push(line);
          if (j < lines.length - 1) acc.push(<br key={`br-${i}-${j}`} />);
        });
      } else {
        acc.push(part);
      }
      return acc;
    }, []);

    return text;
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        className={`ai-chat-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Chatbot"
        id="chatbot-toggle-btn"
      >
        {isOpen ? <X className="toggle-icon" /> : <MessageCircle className="toggle-icon" />}
        {!isOpen && <span className="toggle-pulse" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`ai-chatbot ${isMinimized ? 'minimized' : ''}`}>
          <div className="chat-header">
            <div className="chat-title">
              <div className="chat-icon-wrapper">
                <Sparkles className="chat-icon" />
              </div>
              <div>
                <h3>AI Career Advisor</h3>
                <p>Powered by Gemini</p>
              </div>
            </div>
            <div className="chat-controls">
              <button
                className="minimize-btn"
                onClick={() => setIsMinimized(!isMinimized)}
                aria-label="Minimize chat"
              >
                <Minimize2 className="control-icon" />
              </button>
              <button
                className="close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <X className="control-icon" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="chat-messages">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message ${message.type} ${message.isError ? 'error' : ''}`}
                  >
                    {message.type === 'bot' && (
                      <div className="bot-avatar">
                        <Bot size={14} />
                      </div>
                    )}
                    <div className="message-content">
                      <p>{renderContent(message.content)}</p>
                      <span className="message-time">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="message bot">
                    <div className="bot-avatar">
                      <Bot size={14} />
                    </div>
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {error && (
                <div className="chat-error">
                  <AlertTriangle size={14} />
                  <span>{error}</span>
                  <button onClick={() => setError(null)}>×</button>
                </div>
              )}

              <div className="chat-input">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask me anything about your career..."
                  className="message-input"
                  id="chatbot-message-input"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="send-btn"
                  id="chatbot-send-btn"
                >
                  <Send className="send-icon" />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <style jsx>{`
        .ai-chat-toggle {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 60px;
          height: 60px;
          border: none;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .ai-chat-toggle:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(59, 130, 246, 0.4);
        }

        .ai-chat-toggle.active {
          background: var(--danger-color);
        }

        .toggle-icon {
          width: 24px;
          height: 24px;
        }

        .toggle-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          animation: pulse-ring 2s ease-out infinite;
          z-index: -1;
        }

        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        .ai-chatbot {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 380px;
          height: 540px;
          background: var(--card-bg);
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          border: 1px solid var(--border-color);
          animation: chat-slide-in 0.3s ease-out;
        }

        @keyframes chat-slide-in {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .ai-chatbot.minimized {
          height: 60px;
        }

        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.08));
          border-radius: 16px 16px 0 0;
        }

        .chat-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .chat-icon-wrapper {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-icon {
          width: 20px;
          height: 20px;
          color: white;
        }

        .chat-title h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .chat-title p {
          margin: 0;
          font-size: 0.7rem;
          color: var(--text-secondary);
          opacity: 0.8;
        }

        .chat-controls {
          display: flex;
          gap: 0.5rem;
        }

        .minimize-btn,
        .close-btn {
          width: 32px;
          height: 32px;
          border: none;
          background: var(--hover-bg);
          color: var(--text-secondary);
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .minimize-btn:hover,
        .close-btn:hover {
          background: var(--danger-color);
          color: white;
        }

        .control-icon {
          width: 16px;
          height: 16px;
        }

        .chat-messages {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .message {
          display: flex;
          gap: 0.5rem;
          animation: msg-fade-in 0.3s ease-out;
        }

        @keyframes msg-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .message.user {
          justify-content: flex-end;
        }

        .message.bot {
          justify-content: flex-start;
        }

        .bot-avatar {
          width: 24px;
          height: 24px;
          min-width: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-top: 4px;
        }

        .message-content {
          max-width: 75%;
          padding: 0.75rem 1rem;
          border-radius: 16px;
          position: relative;
        }

        .message.user .message-content {
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message.bot .message-content {
          background: var(--hover-bg);
          color: var(--text-primary);
          border-bottom-left-radius: 4px;
        }

        .message.error .message-content {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .message-content p {
          margin: 0;
          font-size: 0.85rem;
          line-height: 1.5;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .message-time {
          font-size: 0.7rem;
          opacity: 0.6;
          margin-top: 0.25rem;
          display: block;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          align-items: center;
          padding: 4px 0;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--text-secondary);
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        .chat-error {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          font-size: 0.8rem;
          border-top: 1px solid rgba(239, 68, 68, 0.2);
        }

        .chat-error button {
          margin-left: auto;
          background: none;
          border: none;
          color: #ef4444;
          cursor: pointer;
          font-size: 1.1rem;
          padding: 0 4px;
        }

        .chat-input {
          display: flex;
          padding: 1rem;
          border-top: 1px solid var(--border-color);
          gap: 0.75rem;
        }

        .message-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 24px;
          background: var(--input-bg);
          color: var(--text-primary);
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .message-input:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .message-input:disabled {
          opacity: 0.6;
        }

        .send-btn {
          width: 40px;
          height: 40px;
          border: none;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          color: white;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .send-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .send-icon {
          width: 18px;
          height: 18px;
        }

        @media (max-width: 480px) {
          .ai-chatbot {
            width: calc(100vw - 40px);
            right: 20px;
            left: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default AIChatbot;
