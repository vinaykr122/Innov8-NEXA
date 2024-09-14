import React from 'react';
import { useNavigate } from 'react-router-dom';
// import TeamM from '../components/TeamM';

function HomePage() {
  const navigate = useNavigate();

  const handleStartChatbot = () => {
    navigate('/choose-data');
  };

  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Chatbot</h1>
      <p className="text-lg mb-8">
      Our chatbot is here to simplify your experience by transforming detailed information into straightforward responses and actionable insights.
      </p>
      <button
        className="bg-blue-600 text-white p-3 rounded-lg shadow-md hover:shadow-2xl hover:shadow-gray-900 transition-all duration-300 ease-in-out"
        onClick={handleStartChatbot}
      >
        Create Chatbot
      </button>

    </div>
  );
}

export default HomePage;
