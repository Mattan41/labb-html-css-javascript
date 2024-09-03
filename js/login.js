
/*
TODO:    Better styling for favourites list
         Fix movie details view in desktop view
         Media queries fonts and sizes

todo: BUG-FIX favourites: Update movieList after favourite is toggled
todo: BUG-FIX erase welcome message when logging out





TODO:    SENARE
    FEATURE  load genres from movies local storage,
    Favourite F icon better styling and more clear what it does
    make logout function more intuitive

todo: FEATURE filtersort both ways, better design where to click
todo:  dark theme, global settings
todo: design/styling - better looking filter, better looking movie list, better looking movie details, better looking favourites list
    monocrome
TODO: Style  HEADER VIEW IN MOBILE, TABLET, DESKTOP
    FEATURE  clickable movies in favourites in list.
 */
// Kontrollera om användaren är inloggad

window.onload = function () {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const loginButton = document.getElementById("login-button");

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
    alert("Login successful for user: " + username);
    showLogoutForm();
    document.getElementById("login-button").classList.add("logged-in");
    document.getElementById("login-button").title = "Log out";
}

function logout() {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("username");
    alert("You have logged out.");
    document.getElementById("login-button").classList.remove("logged-in");
    document.getElementById("login-button").title = "Login or Register";
}

function showLogoutForm() {
    const username = sessionStorage.getItem("username");
    document.getElementById("welcome-message").textContent = "Hi, " + username + "!";
    document.getElementById("logout-form").style.display = "flex";
}

function toggleLoginForm() {
    const loginPopup = document.getElementById("login-popup");
    loginPopup.style.display = loginPopup.style.display === "none" || loginPopup.style.display === "" ? "flex" : "none";
}