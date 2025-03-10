// filepath: /home/mbat/Desktop/robowar/LeaderBoard/public/js/firebase.js

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
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

