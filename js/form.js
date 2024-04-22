import { validateEmail, isRequired } from "./utils.mjs";

const form = document.getElementById('form')

document.getElementById('email').focus();

const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData)

    let isEmailValid = checkEmail(data.email);

    let isFormValid = isEmailValid;

    if (isFormValid) {
        try {
            // USE WHEN SERVER RUNNING
            // const response = await fetch('http://localhost:8000/subscribe', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(data)
            // });

            // if (!response.ok) {
            //     throw new Error('Failed to subscribe');
            // }

            // // Log the response
            // const responseText = await response.text();
            // console.log('Response from server:', responseText);

            // Store email in session storage
            sessionStorage.setItem('subscribedEmail', data.email);

            // Redirect to thank.html
            location.href = 'thank.html';
        } catch (error) {
            console.error(error);
            // Show error message to the user
            showError('Failed to subscribe. Please try again later.');
        }
    }
}

form.addEventListener('submit', handleSubmit)


const showError = (message) => {
    const err = document.getElementById('email-error');
    const errInput = document.getElementById('email')
    err.innerText = message;
    errInput.classList.add('input-error')
    err.classList.add('show')
    setTimeout(() => {
        err.classList.remove('show')
        errInput.classList.remove('input-error')
    }, 2000)
}

const checkEmail = (email) => {
    let valid = false;
    if (!isRequired(email)) {
        showError('Email cannot be blank')
    } else if (!validateEmail(email)) {
        showError('Email is not valid')
    } else {
        valid = true;
    }
    return valid;
}