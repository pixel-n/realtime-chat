import React from 'react';

export default function Dashboard({ currentUser, onEnterChat, onLogout }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-4 font-sans text-white">
      <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl text-center max-w-md w-full shadow-2xl">
        <h2 className="text-xl font-bold mb-2">Welcome, {currentUser.email}</h2>
        <p className="text-gray-400 text-sm mb-6">Select an option to start chatting</p>
        <button 
          onClick={onEnterChat}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 font-semibold rounded-xl text-sm mb-3 transition shadow-lg shadow-indigo-600/20"
        >
          Enter Global Live Room
        </button>
        <button 
          onClick={onLogout}
          className="w-full py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-semibold rounded-xl text-sm transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}