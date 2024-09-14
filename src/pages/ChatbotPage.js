import React, { useEffect } from 'react';

const ChatbotPage = () => {
  useEffect(() => {
    // Create and add Botpress Webchat script
    const botpressScript = document.createElement('script');
    botpressScript.src = 'https://cdn.botpress.cloud/webchat/v2.1/inject.js';
    botpressScript.async = true;
    document.body.appendChild(botpressScript);

    // Create and add Botpress Webchat config script
    const botpressConfigScript = document.createElement('script');
    botpressConfigScript.src = 'https://mediafiles.botpress.cloud/8f3216db-30f5-4bb0-b684-21a200c4911a/webchat/v2.1/config.js';
    botpressConfigScript.async = true;
    document.body.appendChild(botpressConfigScript);

    // Initialize the Botpress Webchat after the scripts have loaded
    const initializeChatbot = () => {
      if (window.botpressWebchat) {
        window.botpressWebchat.init({
          botId: 'c4dbd48b-7f8d-4364-807f-a2f5aac14e27', // Replace with your actual bot ID
          clientId: 'bp_pat_qn3u3LV4U0tz0z7QcXdJYC3fgyrVO54GVUAO', // Replace with your actual client ID
          container: '#chatbot-container' // The element where the chatbot will be rendered
        });
      }
    };

    botpressScript.onload = initializeChatbot;
    botpressConfigScript.onload = initializeChatbot;

    // Clean up the scripts when the component unmounts
    return () => {
      document.body.removeChild(botpressScript);
      document.body.removeChild(botpressConfigScript);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Chatbot Page</h1>
      <div id="chatbot-container" style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};

export default ChatbotPage;
