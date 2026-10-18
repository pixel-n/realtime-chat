import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { ref, push, onValue } from 'firebase/database';

export default function ChatRoom({ username, onLeave }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Real-time listener for database updates via useEffect
  useEffect(() => {
    const chatRef = ref(db, 'global_messages');
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loaded = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setMessages(loaded);
      } else {
        setMessages([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    push(ref(db, 'global_messages'), {
      sender: username,
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    setInputText('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-gray-100 font-sans">
      <header className="h-16 border-b border-gray-800 px-6 flex items-center justify-between bg-gray-900">
        <h3 className="font-semibold text-sm">Live Chat Room</h3>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400">User: <strong className="text-indigo-400">{username}</strong></span>
          <button onClick={onLeave} className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg text-xs font-semibold transition">
            Leave Room
          </button>
        </div>
      </header>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.sender === username;
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <span className="text-[10px] text-gray-500 mb-1">{msg.sender} • {msg.timestamp}</span>
              <div className={`max-w-md px-4 py-3 rounded-2xl text-sm ${isMe ? 'bg-indigo-600 text-white' : 'bg-gray-900 border border-gray-800 text-gray-200'}`}>
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-4 bg-gray-900 border-t border-gray-800">
        <form onSubmit={handleSend} className="flex gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
          />
          <button type="submit" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}