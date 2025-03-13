import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8hDq3a07TaOFy46etOki0uALk20rgRq0",
  authDomain: "leaderboard-89e30.firebaseapp.com",
  databaseURL: "https://leaderboard-89e30-default-rtdb.firebaseio.com/",
  projectId: "leaderboard-89e30",
  storageBucket: "leaderboard-89e30.firebasestorage.app",
  messagingSenderId: "313442857",
  appId: "1:313442857:web:03997da5af672a20f69238",
  measurementId: "G-5VQ4S0H11Q",
  databaseURL: "https://leaderboard-89e30-default-rtdb.asia-southeast1.firebasedatabase.app/"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { app, database, auth };

