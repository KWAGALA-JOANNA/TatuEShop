// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClq9z6yDC33cSiMYIZKCI5fwQlWEx8XGA",
  authDomain: "tatu-ecommerce.firebaseapp.com",
  projectId: "tatu-ecommerce",
  storageBucket: "tatu-ecommerce.firebasestorage.app",
  messagingSenderId: "1059606792421",
  appId: "1:1059606792421:web:300c1a43cfe83b115f2c0c",
  measurementId: "G-1T1PSV7J35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Google Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export auth and provider
export { auth, provider, analytics };
