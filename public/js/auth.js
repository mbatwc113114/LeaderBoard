// ✅ Import necessary functions from Firebase Auth
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 
    "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { app } from "./firebase.js";  // ✅ Ensure firebase.js exports 'app'

// ✅ Initialize Firebase Auth properly
const auth = getAuth(app);

// Function to sign in an existing user
function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('✅ User signed in:', user);
        })
        .catch((error) => {
            console.error('❌ Error signing in:', error.code, error.message);
        });
}

// Function to sign out the current user
function signOutUser() {
    signOut(auth)
        .then(() => console.log('✅ User signed out'))
        .catch((error) => console.error('❌ Error signing out:', error));
}

alert("✅ auth.js loaded");

// DOM Elements
const username = document.getElementById("username");
const passwd = document.getElementById("password");
const auth_btn = document.getElementById("auth_btn");

// Attach event listener
auth_btn.addEventListener("click", function() {
    signIn(username.value, passwd.value);
    console.log("🔘 Sign-in button clicked");
});

// ✅ Check authentication state and redirect
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("✅ User is signed in:", user.email);
        window.location = "admin_dashboard.html";
    } else {
        console.log("🚪 User is signed out");
    }
});
