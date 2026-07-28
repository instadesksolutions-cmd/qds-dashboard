// Import the functions you need from the CDN SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration (Exactly from your screenshot)
const firebaseConfig = {
    apiKey: "AIzaSyBJTSXKOBcMt3uoJENxDqjvl1xfO4K1XDM",
    authDomain: "qwickdesksolutions.firebaseapp.com",
    projectId: "qwickdesksolutions",
    storageBucket: "qwickdesksolutions.firebasestorage.app",
    messagingSenderId: "508191640643",
    appId: "1:508191640643:web:42576f5d75aafea9ef58f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// EXPORT KARNA ZAROORI HAI (Isi se login.html aur baki pages chalenge)
export const auth = getAuth(app);
export const db = getFirestore(app); 
export const provider = new GoogleAuthProvider();
