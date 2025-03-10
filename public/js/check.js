document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Hardcoded login credentials (for testing only, NOT SECURE)
    if (username === "admin" && password === "password123") {
        window.location.href = "admin_dashboard.html"; // Redirect on success
    } else {
        document.getElementById("errorMessage").textContent = "Invalid credentials!";
    }
});

