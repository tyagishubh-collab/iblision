// Hello Shubh Tyagi this side, I Welcome you to our bakend managing system, also i just wanna tell you that this is the
//whole and soul backend manager of our login and signup page, this code is managing both of them at the same time.
//Ihave used local storage instead of database to store data as we currently don't have any plans to host the website.
//Incase of any query regarding the database feel free to reach out to me, and if you got any new ideas i would be happy to have a discussion on it.
// Also if you want to edit the code, kindly write about the time and error you executed it. 
const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input'); // Only exists on signup
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input'); // Only exists on signup
const error_message = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
  let errors = [];

  if (firstname_input) {
    // If we have a firstname input, then it's a signup form
    errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password_input.value);
    
    if (errors.length === 0) {
      // If no errors, store the data (signup process)
      storeUserData(email_input.value, password_input.value);
      alert('Sign up successful!');
    }
  } else {
    // If there is no firstname input, then it's a login form
    errors = getLoginFormErrors(email_input.value, password_input.value);

    if (errors.length === 0) {
      // If no errors, validate the login
      if (!validateLogin(email_input.value, password_input.value)) {
        errors.push('Invalid email or password');
      } else {
        alert('Login successful!');
      }
    }
  }

  if (errors.length > 0) {
    // If there are any errors, prevent form submission and show errors
    e.preventDefault();
    error_message.innerText = errors.join(". ");
  }
});

// Function to store user data in localStorage during signup
function storeUserData(email, password) {
  // Store the user data in localStorage (for simplicity, in real applications use server-side storage)
  const user = { email, password };
  localStorage.setItem('user', JSON.stringify(user));
}

// Function to validate login credentials
function validateLogin(email, password) {
  // Retrieve user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser && storedUser.email === email && storedUser.password === password) {
    return true;
  }
  return false;
}

function getSignupFormErrors(firstname, email, password, repeatPassword) {
  let errors = [];

  if (firstname === '' || firstname == null) {
    errors.push('Firstname is required');
    firstname_input.parentElement.classList.add('incorrect');
  }
  if (email === '' || email == null) {
    errors.push('Email is required');
    email_input.parentElement.classList.add('incorrect');
  }
  if (password === '' || password == null) {
    errors.push('Password is required');
    password_input.parentElement.classList.add('incorrect');
  }
  if (password.length < 8) {
    errors.push('Password must have at least 8 characters');
    password_input.parentElement.classList.add('incorrect');
  }
  if (password !== repeatPassword) {
    errors.push('Password does not match repeated password');
    password_input.parentElement.classList.add('incorrect');
    repeat_password_input.parentElement.classList.add('incorrect');
  }

  return errors;
}

function getLoginFormErrors(email, password) {
  let errors = [];

  if (email === '' || email == null) {
    errors.push('Email is required');
    email_input.parentElement.classList.add('incorrect');
  }
  if (password === '' || password == null) {
    errors.push('Password is required');
    password_input.parentElement.classList.add('incorrect');
  }

  return errors;
}

const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null);

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if (input.parentElement.classList.contains('incorrect')) {
      input.parentElement.classList.remove('incorrect');
      error_message.innerText = '';
    }
  });
});
