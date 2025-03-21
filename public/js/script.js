console.log("working");
document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/admin-login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (result.success) {
        window.location.href = "/admin-dashboard";
    } else {
        document.getElementById("errorMessage").textContent = "Invalid credentials!";
    }
});


function redirectTo(page) {
    window.location.href = page; // Redirect in the same tab
}
