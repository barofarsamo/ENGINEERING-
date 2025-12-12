
// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

// Add a declaration for the global window property to satisfy TypeScript
declare global {
    interface Window {
        FIREBASE_CONFIG: any;
    }
}

// Firebase configuration is loaded from firebase-config.js into the window object
const firebaseConfig = window.FIREBASE_CONFIG;

// Declare app and auth which will be conditionally initialized
let app: FirebaseApp | null = null;
export let auth: Auth | null = null;

// Check if the Firebase configuration is valid and not using placeholder values
// We check for existence, string type, length, and ensure it's not the default "YOUR_" placeholder
const isConfigValid = 
    firebaseConfig && 
    firebaseConfig.apiKey && 
    typeof firebaseConfig.apiKey === 'string' &&
    firebaseConfig.apiKey.length > 20 &&
    !firebaseConfig.apiKey.startsWith("YOUR_");

if (isConfigValid) {
    try {
        // If config is valid, initialize Firebase
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
    } catch (error) {
        console.error("Firebase initialization failed:", error);
        // Ensure auth is null if initialization fails
        auth = null;
    }
} else {
    // Log a warning instead of error to avoid alarming users who haven't set up Firebase yet
    console.warn("Firebase config is not set or is invalid. Authentication features will be disabled. Please create and populate firebase-config.js with your project credentials.");
}
