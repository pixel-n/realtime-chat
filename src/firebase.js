import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsf27DzwTi8zdaNmc-MJVwq8wAByh6KcM",
  authDomain: "realtime-chat-12122.firebaseapp.com",
  databaseURL: "https://realtime-chat-12122-default-rtdb.firebaseio.com",
  projectId: "realtime-chat-12122",
  storageBucket: "realtime-chat-12122.firebasestorage.app",
  messagingSenderId: "567947855344",
  appId: "1:567947855344:web:27fbe7fd147544af2d0935",
  measurementId: "G-6XQFTQKJ1N"
};

// Initialize Firebase and Database
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);