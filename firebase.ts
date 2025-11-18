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
const isConfigValid = firebaseConfig && firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith("YOUR_");

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
    // Log an error if the config is missing or contains placeholder values
    console.error("Firebase config is not set or is invalid. Please create and populate firebase-config.js with your project credentials.");
}
