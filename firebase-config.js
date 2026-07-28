import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Tumhari Firebase project ki exact keys
const firebaseConfig = {
  apiKey: "AIzaSyBJTSXKOBcMt3uoJENxDqjvl1xfO4K1XDM",
  authDomain: "qwickdesksolutions.firebaseapp.com",
  projectId: "qwickdesksolutions",
  storageBucket: "qwickdesksolutions.firebasestorage.app",
  messagingSenderId: "508191640643",
  appId: "1:508191640643:web:42576f5d75aafea9ef58f6"
};

// Firebase initialize karna
const app = initializeApp(firebaseConfig);

// Authentication aur Database setup
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
