// Hello Shubh Tyagi this side, I Welcome you to our backend managing system.
// This code manages both login and signup using localStorage.
// Reach out with queries, and note any changes if editing the code.

const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input'); // Only exists on signup
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input'); // Only exists on signup
const error_message = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form submission to handle validation and redirection manually

  let errors = [];

  if (firstname_input) {
    // Signup form validation
    errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password_input.value);
    
    if (errors.length === 0) {
      // Store the data in localStorage for signup
      storeUserData(email_input.value, password_input.value);
      alert('Sign up successful!');
      // Redirect to index.html (dashboard) after successful signup
      window.location.href = "dash.html";
      return; // Stop further code execution after redirection
    }
  } else {
    // Login form validation
    errors = getLoginFormErrors(email_input.value, password_input.value);

    if (errors.length === 0) {
      // Validate login credentials
      if (validateLogin(email_input.value, password_input.value)) {
        alert('Login successful!');
        // Redirect to index.html (dashboard) after successful login
        window.location.href = "dash.html";
        return; // Stop further code execution after redirection
      } else {
        errors.push('Invalid email or password');
      }
    }
  }

  if (errors.length > 0) {
    // Display errors if any are present
    error_message.innerText = errors.join(". ");
  }
});

// Function to store user data in localStorage during signup
function storeUserData(email, password) {
  const user = { email, password };
  localStorage.setItem('user', JSON.stringify(user));
}

// Function to validate login credentials
function validateLogin(email, password) {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  return storedUser && storedUser.email === email && storedUser.password === password;
}

function getSignupFormErrors(firstname, email, password, repeatPassword) {
  let errors = [];

  if (!firstname) errors.push('Firstname is required');
  if (!email) errors.push('Email is required');
  if (!password) errors.push('Password is required');
  if (password.length < 8) errors.push('Password must have at least 8 characters');
  if (password !== repeatPassword) errors.push('Password does not match repeated password');

  return errors;
}

function getLoginFormErrors(email, password) {
  let errors = [];

  if (!email) errors.push('Email is required');
  if (!password) errors.push('Password is required');

  return errors;
}

// Clear error styles on input change
const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null);
allInputs.forEach(input => {
  input.addEventListener('input', () => {
    input.parentElement.classList.remove('incorrect');
    error_message.innerText = '';
  });
});
