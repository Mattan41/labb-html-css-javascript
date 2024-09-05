
/*
todo: Dark theme, global settings
todo: design/styling - better looking filter-view, Better styling for favourites list
todo: functionality filter sort / genres. favourite list
 */
// Kontrollera om användaren är inloggad

window.onload = function () {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const loginButton = document.getElementById("login-button");

    // Set initial welcome message
    document.getElementById("welcome-message").textContent = "Hi! Sign in";


    if (isLoggedIn) {
        showLogoutForm();
        loginButton.classList.add("logged-in");
        loginButton.title = "Log out";
    } else {
        loginButton.classList.remove("logged-in");
        loginButton.title = "Login or Register";
    }

    loginButton.addEventListener("click", function () {
        if (sessionStorage.getItem("isLoggedIn")) {
            logout();
        } else {
            toggleLoginForm();
        }
    });

    document.addEventListener("click", function (event) {
        const loginPopup = document.getElementById("login-popup");
        if (!loginPopup.contains(event.target) && event.target.id !== "login-button") {
            loginPopup.style.display = "none";
        }
    });
};

function login(event) {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if (!username || !password) {
        errorMessage.textContent = "Please fill in both username and password.";
        errorMessage.style.display = "block";
        return;
    }

    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("username", username);
    document.getElementById("login-popup").style.display = "none";
    alert("Sign in successful for user: " + username);
    showLogoutForm();
    document.getElementById("login-button").classList.add("logged-in");
    document.getElementById("login-button").title = "Log out";

}

function logout() {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("username");
    alert("You have logged out.");
    document.getElementById("login-button").classList.remove("logged-in");
    document.getElementById("login-button").title = "Sign in";
    document.getElementById("welcome-message").textContent = "Hi! Sign in";
}

function showLogoutForm() {
    const username = sessionStorage.getItem("username");
    document.getElementById("welcome-message").textContent = "Hi, " + username + "!";
    document.getElementById("logout-form").style.display = "flex";
}

function toggleLoginForm() {
    const loginPopup = document.getElementById("login-popup");
    loginPopup.style.display = loginPopup.style.display === "none" || loginPopup.style.display === "" ? "flow" : "none";
}

// Show/hide password
document.getElementById('toggle-password').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggle-password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
});