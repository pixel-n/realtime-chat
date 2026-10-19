import React from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';

function MainApp() {
  const { currentUser } = useAuth();

  // Show Login screen if not authenticated, otherwise show ChatRoom
  return !currentUser ? <Login /> : <ChatRoom />;
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}