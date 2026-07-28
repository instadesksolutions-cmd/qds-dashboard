import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, getDoc, updateDoc, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

let currentUser = null;

// Security check and Load Data
onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        const docRef = doc(db, "clients", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const data = docSnap.data();
            document.getElementById('clientName').innerText = "Hi, " + data.name;
            document.getElementById('clientPlan').innerText = data.planName + " (₹" + data.planAmount + ")";
            document.getElementById('clientWallet').innerText = "₹" + (data.wallet || 0);
            
            const statusEl = document.getElementById('clientStatus');
            statusEl.innerText = data.status;

            // UI Changes based on Payment Status
            if (data.status === "Pending Payment") {
                document.getElementById('paymentSection').classList.remove('hidden-section');
                statusEl.className = "px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-500/20 text-yellow-400";
            } else if (data.status === "Active") {
                statusEl.className = "px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400";
                document.getElementById('step2Icon').className = "w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white";
                document.getElementById('step2Text').className = "text-sm font-semibold text-white";
                document.getElementById('step2Text').innerText = "Payment Verified & Active";
            } else if (data.status === "Verification Under Review") {
                statusEl.className = "px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400";
                document.getElementById('step2Text').innerText = "UTR Submitted (Review in progress)";
            }
        }
    } else {
        window.location.href = "index.html"; // Kick out if not logged in
    }
});

// Submit UTR logic
document.getElementById('utrForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const utr = document.getElementById('utrInput').value.trim().toUpperCase();
    if(!utr || utr.length < 8) {
        alert("Please enter a valid UTR number.");
        return;
    }

    const btn = document.getElementById('utrBtn');
    btn.innerText = "Checking...";

    // Duplicate UTR Check
    const q = query(collection(db, "payments"), where("utr", "==", utr));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        alert("Error: This UTR has already been used. Please check again.");
        btn.innerText = "Submit UTR";
        return;
    }

    // Save Payment
    try {
        await addDoc(collection(db, "payments"), {
            uid: currentUser.uid,
            email: currentUser.email,
            utr: utr,
            status: "Pending",
            timestamp: new Date().toISOString()
        });

        await updateDoc(doc(db, "clients", currentUser.uid), {
            status: "Verification Under Review",
            lastUtr: utr
        });

        alert("Success! Admin will verify soon.");
        location.reload();
    } catch (err) {
        alert("Failed: " + err.message);
        btn.innerText = "Submit UTR";
    }
});

// Logout
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    signOut(auth).then(() => window.location.href = "index.html");
});
