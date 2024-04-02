import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message,  setMessage]  = useState('');
  const [response, setResponse] = useState('');
  const [messageId, setMessageId] = useState(''); // Add this line

  // Define the server URL
  const serverURL = 'http://192.168.0.140:5051';


  const fetchMessage = () => {
    
    // Fetch data from the server
    axios.get(`${serverURL}/`)
      .then(response => {
        console.log(response.data); // Do something with response data
        setMessage(response.data); // Update the state with the response data
      })
      .catch(error => console.error('There was an error!', error));
  };

//   curl -X POST http://192.168.0.140:5051/message \
// -H "Content-Type: application/json" \
// -d '{"message":"Test message"}'

  const sendMessage = async () => {
    try {
      const result = await axios.post(`${serverURL}/message`,{
        message: message,
      });
      console.log(result.data); // Handle response
      setResponse(result.data.reply);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

// curl -X PUT http://192.168.0.140:5051/update-message \
// -H "Content-Type: application/json" \
// -d '{"message": "New message content"}'

const updateMessage = async () => {
  try {
      const result = await axios.put(`${serverURL}/update-message`, {
          message: message, // Assuming 'message' holds the text to be updated
      });
      console.log(result.data); // Handle response
      setResponse(result.data.reply); // Update the response state with the server's reply
  } catch (error) {
      console.error('There was an error!', error);
  }
};
// curl -X DELETE http://localhost:5051/delete-message/123

const deleteMessage = async () => {
  try {
      const result = await axios.delete(`${serverURL}/delete-message/${messageId}`);
      console.log(result.data); // Handle response
      setResponse(result.data.message); // Update the response state with the server's reply
  } catch (error) {
      console.error('There was an error!', error);
  }
};

return (
  <div className="App">
    {/* Button to fetch the message from the server */}
    <button onClick={fetchMessage}>Fetch Message</button>
    {/* Display the server message */}
    <p>Server says GET: {message}</p>
    <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter a message"
      />
      <button onClick={sendMessage}>Send Message</button>
      {response && <p>Server Response: {response}</p>}

      {/* Button to update the message on the server */}
      <button onClick={updateMessage}>Update PUT Message</button>

      {/* Display the server's response */}
      {response && <p>Server Response: {response}</p>}

      <br/>
      <br/>

        {/* Input for message ID to delete */}
        <input
          type="text"
          value={messageId}
          onChange={(e) => setMessageId(e.target.value)}
          placeholder="Enter message ID to delete"
      />
      <button onClick={deleteMessage}>Delete Message</button>

      {/* Consolidated server response display */}
      {response && <p>Server Response: {response}</p>}
  </div>
);
}

export default App;