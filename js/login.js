
// todo: fix favourites view - mobile, tablet, desktop, close favourites for mobile
// todo: add movie to favourites, display in list, clickable
// todo: display  welcome message when user logs in
// todo: only sign in if signed out, otherwise sign out
// todo: if clicking outside of login, close login popup
// todo: if logged in, clicking icon should show logout form
// todo:  dark theme
// todo: search movies, filter movies,
// todo: fetch selected movie and show above the list.

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
        "Hi, " + username + "!";
    document.getElementById("logout-form").style.display = "flex";
}