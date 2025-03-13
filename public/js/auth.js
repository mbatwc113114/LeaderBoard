
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