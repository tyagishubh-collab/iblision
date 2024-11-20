// Get necessary DOM elements
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input");
const sendChatBtn = document.querySelector(".send-chat-btn");

const themeBtn = document.querySelector(".theme-btn"); // Theme toggle button
const deleteBtn = document.querySelector(".delete-btn"); // Delete button

let userMessage = null; // Variable to store the user's message
const inputInitHeight = chatInput.scrollHeight; // Store initial height of the chat input field

// API configuration
const API_KEY = "AIzaSyARfy_BQRwC302-AkO9UQonq277LBxU7Hs"; // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

// Create a chat <li> element for displaying the message
const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);

  let chatContent;
  if (className === "outgoing") {
    chatContent = `<p>${message}</p>`;
  } else {
    chatContent = `<span class="material-symbols-outlined">MediBOT:</span><p>${message}</p>`;
  }
  
  chatLi.innerHTML = chatContent;
  return chatLi;
};

// Generate a response from the API
const generateResponse = async (chatElement) => {
  const messageElement = chatElement.querySelector("p");

  // Define the request body for the API call
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      contents: [{ 
        role: "user", 
        parts: [{ text: userMessage }] 
      }] 
    }),
  };

  // Make the API call and handle the response
  try {
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);
    
    // Update the chat element with the API response text
    messageElement.textContent = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1');
  } catch (error) {
    // Handle errors and display an error message
    messageElement.classList.add("error");
    messageElement.textContent = error.message;
  } finally {
    // Scroll to the bottom of the chatbox
    chatbox.scrollTo(0, chatbox.scrollHeight);
  }
};

// Handle the user input and chat message
const handleChat = () => {
  userMessage = chatInput.value.trim(); // Get and clean up the user input
  if (!userMessage) return; // Do nothing if input is empty

  // Clear the input textarea and reset its height
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Append the user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    // Show a "Thinking..." message while waiting for the response
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600); // Short delay before displaying the "Thinking..." message
};

// Adjust input field height dynamically based on content
chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

// Handle the Enter key to send the message (only if Shift is not pressed)
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

// Handle send button click event
sendChatBtn.addEventListener("click", handleChat);

// Close the chatbot window
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));

// Toggle the visibility of the chatbot
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

// Theme toggle button functionality
themeBtn.addEventListener("click", () => {
  // Toggle light mode class
  document.body.classList.toggle("light-mode");
  
  // Add the active class to the theme button for styling when active
  themeBtn.classList.toggle("active"); // Optional: style for active theme button (you can modify in CSS)
  
  // Store the theme choice in localStorage
  const themeColor = document.body.classList.contains("light-mode") ? "light_mode" : "dark_mode";
  localStorage.setItem("themeColor", themeColor);
});

// Delete button functionality (clear chat)
deleteBtn.addEventListener("click", () => {
  // Clear chat content
  chatbox.innerHTML = ''; 
  
  // Optional: show a default message after clearing chat
  const defaultText = document.createElement("div");
  defaultText.classList.add("default-text");
  defaultText.innerHTML = "<h1>Welcome to MediBot!</h1><p>Your Digital AI Medical Assistant.</p>";
  chatbox.appendChild(defaultText);
});

// Function to load chat history and theme from local storage
const loadDataFromLocalstorage = () => {
  const themeColor = localStorage.getItem("themeColor");
  document.body.classList.toggle("light-mode", themeColor === "light_mode");
  themeBtn.classList.toggle("active", themeColor === "light_mode");

  const defaultText = "<div class='default-text'><h1>Chat with MediBot</h1><p>Start a conversation with MediBot.</p></div>";
  chatbox.innerHTML = localStorage.getItem("all-chats") || defaultText;
  chatbox.scrollTo(0, chatbox.scrollHeight);
};

// Function to create chat bubbles
const createChatElement = (content, className) => {
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat", className);
  chatDiv.innerHTML = content;
  return chatDiv;
};

// Function to show typing animation
const showTypingAnimation = () => {
  const html = "<div class='chat-content'>" +
                "<div class='chat-details'>" +
                  "<img src='logo.png'>" +
                  "<div class='typing-animation'>" +
                    "<div class='typing-dot' style='--delay: 0.2s'></div>" +
                    "<div class='typing-dot' style='--delay: 0.3s'></div>" +
                    "<div class='typing-dot' style='--delay: 0.4s'></div>" +
                  "</div>" +
                "</div>" +
              "</div>";
  const incomingChatDiv = createChatElement(html, "incoming");
  chatbox.appendChild(incomingChatDiv);
  chatbox.scrollTo(0, chatbox.scrollHeight);
  generateResponse(incomingChatDiv); // Handle response
};

// Initialize chat and theme from localStorage on page load
window.addEventListener("DOMContentLoaded", loadDataFromLocalstorage);
