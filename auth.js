import { auth, db, googleProvider } from "./firebase-config.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Auto-redirect if already logged in
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const docRef = doc(db, "clients", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().planSelected) {
            window.location.href = "dashboard.html"; // Send to dashboard
        } else {
            document.getElementById('authCard').classList.add('hidden-section');
            document.getElementById('planCard').classList.remove('hidden-section');
        }
    }
});

// Email/Password Login & Signup
document.getElementById('authForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const btn = document.getElementById('authBtn');
    
    btn.innerText = "Processing...";
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err2) {
            alert("Error: " + err2.message);
            btn.innerText = "Secure Login / Register";
        }
    }
});

// Google Login
document.getElementById('googleBtn')?.addEventListener('click', async () => {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (err) {
        alert("Google Error: " + err.message);
    }
});

// Plan Selection Function
window.selectPlan = async (planName, amount) => {
    const user = auth.currentUser;
    if(!user) return;
    
    await setDoc(doc(db, "clients", user.uid), {
        email: user.email,
        name: user.displayName || user.email.split('@')[0],
        planName: planName,
        planAmount: amount,
        planSelected: true,
        status: "Pending Payment",
        wallet: 0,
        createdAt: new Date().toISOString()
    }, { merge: true });
    
    window.location.href = "dashboard.html";
};
