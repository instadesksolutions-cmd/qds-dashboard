import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "TERA_API_KEY_YAHAN_DAAL", // Update with your actual API key
    authDomain: "qwickdesksolutions.firebaseapp.com",
    projectId: "qwickdesksolutions",
    storageBucket: "qwickdesksolutions.firebasestorage.app",
    messagingSenderId: "508191640643",
    appId: "1:508191640643:web:42576f5d75aafea9ef58f6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
