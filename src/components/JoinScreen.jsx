import React, { useState } from 'react';

export default function JoinScreen({ onJoin }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    onJoin(username.trim()); // Pass display name
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 p-4 font-sans">
      <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-2">Join Chat Room</h1>
        <p className="text-gray-400 text-sm mb-6">Enter a display name to start chatting</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your display name..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
            required
          />
          <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition">
            Enter Live Room
          </button>
        </form>
      </div>
    </div>
  );
}