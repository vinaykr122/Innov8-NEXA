// src/pages/ChatbotPage.js
import React, { useState, useEffect } from 'react';

const ChatbotPage = () => {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to call the Botpress API
  const callBotpressAPI = () => {
    setLoading(true);  // Show loading while the request is in progress

    const options = {
      method: 'PUT',
      headers: { 
        accept: 'application/json', 
        'content-type': 'application/json' 
      }
    };

    fetch('https://api.botpress.cloud/v1/files/id', options)
      .then(response => response.json())
      .then(response => {
        setResponseData(response);  // Set the response data from the API
        setLoading(false);          // Stop the loading indicator
      })
      .catch(err => {
        console.error(err);
        setError(err);              // Capture error if the request fails
        setLoading(false);
      });
  };

  // Optionally, you can call the API when the component loads by using useEffect
  useEffect(() => {
    callBotpressAPI();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Chatbot Interface</h2>
        <p className="text-lg text-gray-700 mb-6">
          Our chatbot can help you by answering your questions and simplifying the solutions.
        </p>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {responseData && (
          <pre className="text-sm text-gray-800">{JSON.stringify(responseData, null, 2)}</pre>
        )}

        {/* You can add a button to manually trigger the API call */}
        <button 
          onClick={callBotpressAPI}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Reload Chatbot Data
        </button>
      </div>
    </div>
  );
};

export default ChatbotPage;
