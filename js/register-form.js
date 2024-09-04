// js/register-form.js

window.onload = function () {
    document.getElementById('register-form').addEventListener('submit', handleSubmit);
};

function handleSubmit(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    alert('You have registered successfully. Welcome!');
    window.location.href = 'index.html?message=success';
}