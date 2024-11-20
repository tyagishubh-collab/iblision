document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    
    // Define form data fields
    const formData = {
        firstname: document.querySelector("input[name='firstname']"),
        lastname: document.querySelector("input[name='lastname']"),
        email: document.querySelector("input[name='email']"),
        contact: document.querySelector("input[name='contact no.']"),
        alternateContact: document.querySelector("input[name='alternate contact no.']"),
        birthdate: document.querySelector("input[name='birthdate']"),
        gender: document.querySelector("select[name='gender']"),
        age: document.querySelector("input[name='Age']"),
        bloodGroup: document.querySelector("select[name='Blood group']"),
        height: document.querySelector("input[name='Height']"),
        weight: document.querySelector("input[name='Weight']"),
        address: document.querySelector("input[name='address']"),
        alternateAddress: document.querySelector("input[name='alternate address']"),
        country: document.querySelector("select[name='country']"),
        state: document.querySelector("select[name='State']"),
        city: document.querySelector("input[name='City']"),
        previousIllness: document.querySelector("input[name='Previous Illness']"),
        aboutMe: document.querySelector("textarea[name='About me']")
    };

    // Load saved values from localStorage
    for (const key in formData) {
        const savedValue = localStorage.getItem(key);
        if (savedValue) {
            formData[key].value = savedValue;
        }
    }

    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from submitting the traditional way

        // Save data to localStorage
        for (const key in formData) {
            localStorage.setItem(key, formData[key].value);
        }

        alert("Your changes have been saved!");
    });
});
