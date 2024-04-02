require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json()); // This line is crucial for parsing JSON request bodies

let allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001'
    
  ];
// Specific CORS configuration
const corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    let requestOrigin = req.header('Origin');
    console.log("Request Origin:", requestOrigin); // Debugging line
  
    if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
      corsOptions = { origin: true };
      console.log("CORS allowed for:", requestOrigin); // Debugging line
    } else {
      corsOptions = { origin: false };
      console.log("CORS denied for:", requestOrigin); // Debugging line
    }
    
    callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));

// Define allowed origins
//let allowedOrigins = ['http://localhost:3000']; // Add the client's origin

// Specific CORS configuration
// const corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   // Check the request's origin against the allowed origins
//   if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true }; // Enable CORS for this request
//   } else {
//     corsOptions = { origin: false }; // Disable CORS for this request
//   }
//   callback(null, corsOptions);
// };

//app.use(cors(corsOptionsDelegate));

app.get('/', (req, res) => {
    res.send('The magic portal is open. Welcome!');
});

// POST Route
app.post("/message", (req, res) => {
  try {
    const { message } = req.body;
    console.log("Received message:", message);
    res.status(200).json({ reply: `Message received: ${message}` });
  } catch (error) {
    console.error("Error handling POST request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT Route to update a message
app.put("/update-message", (req, res) => {
  try {
    const { message } = req.body;
    console.log("Updated message:", message);
    // In a real application, you might update this message in a database or another storage system.
    res.status(200).json({ reply: `Message updated: ${message}` });
  } catch (error) {
    console.error("Error handling PUT request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE Route for deleting a message
app.delete("/delete-message/:id", (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the URL parameter
    console.log("Requested to delete message with ID:", id);
    // Here, you'd typically perform a delete operation on your database or data store
    res
      .status(200)
      .json({
        message: `Message with ID: ${id} has been successfully deleted.`,
      });
  } catch (error) {
    console.error("Error handling DELETE request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


const PORT = process.env.PORT || 5051;
app.listen(PORT, () => {
    console.log(`Server spellbinding in progress on port ${PORT}...`);
});