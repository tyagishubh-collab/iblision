import express from 'express';   // Use dynamic import
import path from 'path';         // Import path module to handle file paths
import { fileURLToPath } from 'url';  // For handling __dirname in ES modules

const app = express();

// For handling __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Example route to serve 'index.html' from the public folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Add more routes as needed, for example:
app.get('/about', (req, res) => {
    res.send('This is the about page');
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
