
function validatePassword(password) {
    const errorMessage = document.getElementById('error-message');
    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordCriteria.test(password)) {
        errorMessage.textContent = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
        errorMessage.style.display = "block";
        return false;
    }

    errorMessage.style.display = "none";
    return true;
}

document.getElementById('register-form').addEventListener('submit', function(event) {
    const password = document.getElementById('password').value;
    if (!validatePassword(password)) {
        event.preventDefault();
    }
});