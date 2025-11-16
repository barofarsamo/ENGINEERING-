// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5Yt2L6a8C8Rlzitb89nsmEbqXCzEfdO0",
  authDomain: "sahan-engineering-050680-98490.firebaseapp.com",
  projectId: "sahan-engineering-050680-98490",
  storageBucket: "sahan-engineering-050680-98490.firebasestorage.app",
  messagingSenderId: "516632715466",
  appId: "1:516632715466:web:2388fb8af8541605c71433",
  measurementId: "G-NKH78BZ5P9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
