// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzKGs9Rrvh3QRY5Xo4OYRiU-hqCe3DnpU",
  authDomain: "bakerzbite-60ca5.firebaseapp.com",
  projectId: "bakerzbite-60ca5",
  storageBucket: "bakerzbite-60ca5.firebasestorage.app",
  messagingSenderId: "362264206792",
  appId: "1:362264206792:web:20404f4767cb59f26ef4fd",
  measurementId: "G-CP4PFK0JY5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Configure Google provider settings
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
  prompt: 'select_account' // Always show account selection
});

export { app, analytics, auth, googleProvider };