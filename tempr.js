// Date validation
const dateInput = document.getElementById('date');
dateInput.addEventListener('change', function validateDate() {
    const selectedDate = new Date(dateInput.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set time to midnight

    if (selectedDate <= currentDate) {
        alert('Please select a future date');
        dateInput.value = ''; // Clear the date value
    }
});

// Form submission handling
const form = document.getElementById('bookingForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const date = dateInput.value;
    const time = document.getElementById('time').value;
    const doctor = document.getElementById('doctor').value;

    // Construct the confirmation message
    const confirmationMessage = `Appointment booked with ${doctor} on ${date} at ${time};`
    // document.getElementById('confirmationMessage').textContent = confirmationMessage;
    openModal(confirmationMessage)
    // textToSpeech(confirmationMessage)

    // Display confirmation message
    document.getElementById('confirmationModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';

    // Speak the confirmation message
    textToSpeech(confirmationMessage);
 
    // Reset the form fields after displaying the message
    form.reset();
});

// Close modal
function openModal(message) {
    document.getElementById("confirmationMessage").innerText = message;
    document.getElementById("confirmationModal").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function closeModal() {
    document.getElementById("confirmationModal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

// Function to set up a reminder
function setAppointmentReminder() {
    const date = dateInput.value;
    const time = document.getElementById('time').value;
    const doctor = document.getElementById('doctor').value;

    const appointmentDateTime = new Date(`${date}T${time}`);
    const reminderTime = 10 * 60 * 1000; // Reminder 10 minutes before appointment

    const now = new Date();
    const timeUntilReminder = appointmentDateTime - now - reminderTime;

    if (timeUntilReminder > 0) {
        setTimeout(() => {
            const reminderMessage = `Reminder: Your appointment with ${doctor} is in 10 minutes at ${time} on ${date}.`;
            alert(reminderMessage);
            textToSpeech(reminderMessage);
        }, timeUntilReminder);
        alert("Reminder set for 10 minutes before your appointment.");
    } else {
        alert("The selected appointment time is too close for a reminder.");
    }
}

// Text-to-speech function
function textToSpeech(message) {
    if ('speechSynthesis' in window) {
        //window.speechSynthesis.cancel();//  // Clear any ongoing speech
        const speech = new SpeechSynthesisUtterance(message);
        speech.lang = 'en-US';
        speech.pitch = 1;
        speech.rate = 1;
        window.speechSynthesis.speak(speech);
    } else {
        alert("Sorry, your browser doesn't support text-to-speech.");
    }
}