import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { gsap } from 'gsap';

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Get authentication status from context
  const aboutRef = useRef(null); // Create a ref for the "About" section

  const handleStartChatbot = () => {
    if (isAuthenticated) {
      navigate('/choose-data');
    } else {
      navigate('/AuthPage');
    }
  };

  useEffect(() => {
    // Animate the about section on page load using gsap.to
    gsap.to(aboutRef.current, { 
      opacity: 1, // Animate to full opacity
      y: -230, // Animate to its original position
      duration: 1.5, 
      ease: "power3.out" 
    });
  }, []);

  return (
    <div className="text-center p-8 bg-blue-50">
      <div className="h-[80vh] flex items-center justify-center flex-col">
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
      <div ref={aboutRef} className="p-5 mt-20 ml-40 mr-40 bg-blue-200 rounded-3xl about" style={{ opacity: 0, transform: 'translateY(50px)' }}>
        <h2 className="font-bold mt-5 mb-10 text-2xl">About Our Chat-bot</h2>
        <p className="pl-20 pr-20">Welcome to <span className="font-bold text-lg">N. E. X. A. </span>, our innovative chatbot generation platform! Whether you have a collection of documents or a website full of information, our tool can transform your data into an intelligent chatbot tailored to your needs. Simply upload your documents or provide a website link, and we'll take care of the rest. Our system processes the information and creates a fully functional chatbot, ready to assist, inform, and engage with your audience. No coding or technical expertise is required—just provide the data, and let our platform do the work for you. Get started today and see how easy it is to bring your data to life!</p>
      </div>
    </div>
  );
}

export default HomePage;
