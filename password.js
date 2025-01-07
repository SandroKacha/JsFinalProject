var form = document.getElementById('form');
var username = document.getElementById('username');
var email = document.getElementById('email');
var password = document.getElementById('password');
var password2 = document.getElementById('password2');
var phone = document.getElementById('Number');
var country = document.getElementById('Country');
var city = document.getElementById('City');

// Show error message
function showError(input, message) {
    var formControl = input.parentElement;
    formControl.className = 'form-control error';
    var small = formControl.querySelector('small');
    small.textContent = message;
    small.style.color = 'var(--error-color)'; 
}

// Show success
function showSucces(input) {
    var formControl = input.parentElement;
    formControl.className = 'form-control success';
    var small = formControl.querySelector('small');
    small.textContent = ''; 
}

// Show medium
function showMedium(input, message) {
    var formControl = input.parentElement;
    formControl.className = 'form-control medium';
    var small = formControl.querySelector('small');
    small.textContent = message;
    small.style.color = 'var(--medium-color)'; 
}

// Show strong
function showStrong(input, message) {
    var formControl = input.parentElement;
    formControl.className = 'form-control strong';
    var small = formControl.querySelector('small');
    small.textContent = message;
    small.style.color = 'var(--success-color)'; 
}

// Check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, getFieldName(input) + ' is required');
        } else {
            showSucces(input);
        }
    });
}

// Get field name with formatting
function getFieldName(input) {
    var title = input.id === 'password2'
        ? 'Confirm Password'
        : input.id.charAt(0).toUpperCase() + input.id.slice(1);
    return title;
}

// Check if passwords match
function passwordMatch(input1, input2) {
    if (input2.value.trim() === '') {
        showError(input2, 'Confirm Password is required');
    } else if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    } else {
        showSucces(input2);
    }
}

// Check password strength
function checkPasswordStrength(input) {
    const value = input.value;

    const hasLowercase = /[a-z]/.test(value); 
    const hasUppercase = /[A-Z]/.test(value); 
    const hasNumbers = /\d/.test(value);      

    if (hasLowercase && hasUppercase && hasNumbers) {
        showStrong(input, 'Password is strong');
    } else if ((hasLowercase || hasUppercase) && hasNumbers) {
        showMedium(input, 'Password is medium');
    } else if (hasLowercase || hasUppercase) {
        showError(input, 'Password is weak');
    } else {
        showError(input, 'Password does not meet strength criteria');
    }
}

// check phone
function checkPhoneNumber(input) {
    const value = input.value.trim();
    if (value === '') {
        showError(input, 'Phone number is required');
    } else if (/^\d{9}$/.test(value)) { 
        showSucces(input);
    } else {
        showError(input, ' must contain exactly 9 digits, no numbers');
    }
}

// check city and country 

function checkTextInput(input) {
    const value = input.value.trim();
    if (value === '') {
        showError(input, getFieldName(input) + ' is required');
    } else if (/^[a-zA-Z]+$/.test(value)) { 
        showSucces(input);
    } else {
        showError(input, getFieldName(input) + ' must contain only letters');
    }
}


function checkEmail(input) {
    const value = input.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (value === '') {
        showError(input, 'Email is required');
    } else if (emailRegex.test(value)) {
        showSucces(input);
    } else {
        showError(input, 'must contain @, . , min 2 chapter after');
    }
}

// Event listener for form submission
form.addEventListener('submit', function (event) {
    event.preventDefault();

    checkRequired([username, email, password, password2, phone, country, city]);
    passwordMatch(password, password2);
    checkPasswordStrength(password);
    checkPhoneNumber(phone);
    checkTextInput(city);
    checkTextInput(country);
    checkEmail(email); 
});
