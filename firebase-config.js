import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBJTSXKOBcMt3uoJENxDqjvl1xfO4K1XDM",
    authDomain: "qwickdesksolutions.firebaseapp.com",
    projectId: "qwickdesksolutions",
    storageBucket: "qwickdesksolutions.firebasestorage.app",
    messagingSenderId: "508191640643",
    appId: "1:508191640643:web:42576f5d75aafea9ef58f6"
};

// Initialize Firebase Engine
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
