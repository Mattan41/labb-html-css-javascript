// todo: update welcome message when user logs in
// todo: only sign in if signed out, otherwise sign out

// Kontrollera om användaren är inloggad
window.onload = function () {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
        showLogoutForm();
    }

    document.getElementById("login-icon").addEventListener("click", showLoginForm);

};

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username && password) {
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("username", username);
        setTimeout(function() {
            document.getElementById("login-popup").style.display = "none";
        }, 100); // close the login-popup after 100ms
        alert("Login successful for user: " + username);
        showLogoutForm();
    } else {
        alert("Vänligen fyll i både användarnamn och lösenord.");
    }
}

function logout() {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("username");
    showLoginForm();
    alert("Du har loggat ut.");
}

function showLoginForm() {
    document.getElementById("login-popup").style.display = "flex";
    document.getElementById("logout-form").style.display = "none";
}

function showLogoutForm() {
    const username = sessionStorage.getItem("username");
    document.getElementById("welcome-message").textContent =
        "Välkommen, " + username + "!";
    document.getElementById("logout-form").style.display = "flex";
}