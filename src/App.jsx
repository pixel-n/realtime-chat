import React, { useState, useEffect } from 'react';
import JoinScreen from './components/JoinScreen';
import ChatRoom from './components/ChatRoom';

export default function App() {
  // Load username from localStorage on initial render
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('chat_username') || '';
  });

  // Save username to localStorage using useEffect whenever it changes
  useEffect(() => {
    if (username) {
      localStorage.setItem('chat_username', username);
    } else {
      localStorage.removeItem('chat_username');
    }
  }, [username]);

  return !username ? (
    <JoinScreen onJoin={(name) => setUsername(name)} />
  ) : (
    <ChatRoom username={username} onLeave={() => setUsername('')} />
  );
}