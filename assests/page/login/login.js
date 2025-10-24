function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthText = document.getElementById('passwordStrength');

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    let strength = 0;
    if (hasUpperCase) strength++;
    if (hasLowerCase) strength++;
    if (hasNumbers) strength++;
    if (hasSpecialChars) strength++;
    if (isLongEnough) strength++;

    if (strength <= 2) {
        strengthText.textContent = "ضعیف";
        strengthText.className = "password-strength weak";
    } else if (strength <= 4) {
        strengthText.textContent = "متوسط";
        strengthText.className = "password-strength medium";
    } else {
        strengthText.textContent = "قوی";
        strengthText.className = "password-strength strong";
    }
}


// اعتبار سنجی


function validateForm() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("رمزعبور و تکرار آن مطابقت ندارند!");
        return false;
    }
    return true;
}

// error

function showMessage(type, text) {
    const messageDiv = document.getElementById('message');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = 'message';
    }, 3000);
}