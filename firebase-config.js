// Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your QwickDeskSolutions Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyBJT5XK0BcMt3uoJENxDqjvl1xf04K1XDM",
    authDomain: "qwickdesksolutions.firebaseapp.com",
    projectId: "qwickdesksolutions",
    storageBucket: "qwickdesksolutions.firebasestorage.app",
    messagingSenderId: "508191640643",
    appId: "1:508191640643:web:42576f5d75aafea9ef58f6"
};

// Initialize everything ONCE
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Export to use in other JS files
export { auth, db, googleProvider };
