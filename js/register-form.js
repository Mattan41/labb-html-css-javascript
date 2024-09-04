
window.onload = function () {
    // Koppla handleSubmit-funktionen till formuläret
    document.getElementById('register-form').addEventListener('submit', handleSubmit);
};

// JavaScript för att hantera formulärskickning
function handleSubmit(event) {
    event.preventDefault();
    alert('Du har registerat dig som användare. Välkommen!');
    window.location.href = 'index.html?message=success';
}


document.getElementById('show-password').addEventListener('change', function() {
    const passwordInput = document.getElementById('password');
    if (this.checked) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});