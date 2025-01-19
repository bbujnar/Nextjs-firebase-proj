// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "frontend-app-wsei.firebaseapp.com",
  projectId: "frontend-app-wsei",
  storageBucket: "frontend-app-wsei.firebasestorage.app",
  messagingSenderId: "193371263244",
  appId: "1:193371263244:web:6ba3fa9cf180e5079bb929",
  measurementId: "G-7M1R3618T9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
