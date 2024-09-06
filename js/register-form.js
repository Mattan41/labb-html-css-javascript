window.onload = function () {
    document.getElementById('register-form').addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const errorMessage = document.getElementById('error-message');

        if (!validatePassword(password)) {
            return;
        }
        if (password !== confirmPassword) {
            errorMessage.textContent = 'Passwords do not match.';
            errorMessage.style.display = 'block';
            return;
        }

        alert('You have registered successfully. Welcome!');
        window.location.href = 'index.html?message=success';
    }

    // Add event listeners for password visibility toggles
    document.getElementById('toggle-password').addEventListener('click', function () {
        togglePasswordVisibility('password', 'toggle-password');
    });

    document.getElementById('toggle-confirm-password').addEventListener('click', function () {
        togglePasswordVisibility('confirm-password', 'toggle-confirm-password');
    });

    function togglePasswordVisibility(inputId, toggleIconId) {
        const passwordInput = document.getElementById(inputId);
        const toggleIcon = document.getElementById(toggleIconId);
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.classList.remove('fa-eye');
            toggleIcon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            toggleIcon.classList.remove('fa-eye-slash');
            toggleIcon.classList.add('fa-eye');
        }
    }
}

function validatePassword(password) {
    const errorMessage = document.getElementById('error-message');
    const passwordCriteria = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordCriteria.test(password)) {
        errorMessage.textContent = "Password must be at least 8 characters long and include one letter and one number.";
        errorMessage.style.display = "block";
        return false;
    }

    errorMessage.style.display = "none";
    return true;
}