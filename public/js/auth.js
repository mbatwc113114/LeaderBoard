// Import Firebase and its services
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB8hDq3a07TaOFy46etOki0uALk20rgRq0",
    authDomain: "leaderboard-89e30.firebaseapp.com",
    databaseURL: "https://leaderboard-89e30.firebaseio.com",
    projectId: "leaderboard-89e30",
    storageBucket: "leaderboard-89e30.firebasestorage.app",
    messagingSenderId: "313442857",
    appId: "1:313442857:web:03997da5af672a20f69238",
    measurementId: "G-5VQ4S0H11Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Function to sign in an existing user
function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
            console.log('User signed in:', user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing in:', errorCode, errorMessage);
        });
}

// Function to sign out the current user
function signOutUser() {
    signOut(auth)
        .then(() => {
            // Signed out successfully
            console.log('User signed out');
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
}

alert("auth.js loaded");

const username = document.getElementById("username");
const passwd = document.getElementById("password");
const auth_btn = document.getElementById("auth_btn");

auth_btn.addEventListener("click", function() {
    signIn(username.value, passwd.value);
    console.log("clicked");
});

// If user is signed in, then forward to admin_dashboard
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signed in");
        window.location = "admin_dashboard.html";
    }
});