
/* todo:
    favourites view - mobile, tablet, desktop, close favourites for mobile
todo:
 add movie to favourites, display in list, clickable. save to local storage when movieList is populated, get from local storage

 todo:
  LOGIN:
  -display  welcome message when user logs in
  -only sign in if signed out, otherwise sign out
  -if clicking outside of login, close login popup
  -if logged in, clicking icon should show logout form

todo:  dark theme


 */
// Kontrollera om användaren är inloggad
window.onload = function () {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
        showLogoutForm();
    }

    document.getElementById("login-icon").addEventListener("click", showLoginForm);

};
// logga in
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
//logga ut
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