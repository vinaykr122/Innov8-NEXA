// src/AuthPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.js';
import image from './SIGNINside.png';

function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const toggleAuth = () => {
    setIsSignIn(!isSignIn);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = isSignIn ? 'http://192.168.56.1:5000/signin' : 'http://192.168.56.1:5000/register';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Call login function from context
        login();
        alert(isSignIn ? 'Sign-in successful!' : 'Account created successfully!');
        navigate('/'); // Redirect to homepage
      } else {
        const result = await response.json();
        alert(result.message || 'Failed to submit form.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <div className="w-[80%] h-[80vh] relative p-5 flex rounded-xl p-5">
      <div
        className={`z-50 absolute top-0 right-0 w-[45%] h-[95%] bg-cover transition-transform duration-1000 ease-in-out bg-indigo-50 rounded-2xl mt-3`}
        style={{
          transform: isSignIn ? 'translateX(-3%)' : 'translateX(-119%)',
          backgroundImage: `url(${image})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-[100%] h-{100%}" style={{ backgroundImage: `url(${image})` }} />
      </div>

      {/* Sign In Form */}
      
        <div className={`absolute top-0 left-0 flex items-center justify-center bg-white z-10 h-[100%] w-[50%]`}>
          <div className="w-full max-w-sm">
            <div className="flex items-center justify-center flex-col">
              <h1 className="text-5xl font-bold mb-2">Welcome Back!</h1>
              <p className="text-lg mb-10 text-center">
                Simplify your workflow and boost your support with <span className="font-bold">NEXA AI</span> Bot
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 mb-2 w-full rounded-3xl border border-gray-800 text-lg"
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="p-2 mb-2 w-full rounded-3xl border border-gray-800 text-lg"
              />
              <div className="mb-10">
                <button type="submit" className="w-full p-4 rounded-3xl mt-5 mb-10 bg-black text-white font-bold">
                  Log in
                </button>
              </div>
            </form>
            <div className="mt-10 text-sm flex items-center justify-center">
              <p>
                Not a member?{' '}
                <span className="text-blue-500 cursor-pointer" onClick={toggleAuth}>
                  Register now
                </span>
              </p>
            </div>
          </div>
        </div>
     

      {/* Sign Up Form */}
      
        <div className={`absolute top-0 right-0 w-1/2 h-full flex items-center justify-center bg-white z-10`}>
          <div className="w-full max-w-sm">
            <div className="flex items-center justify-center flex-col">
              <h1 className="text-5xl font-bold text-center">Create an Account</h1>
              <p className="text-lg mb-10 text-center">
                Join <span className="font-bold">NEXA AI</span> Bot and boost your productivity
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 mb-2 w-full rounded-3xl border border-gray-800 text-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 mb-2 w-full rounded-3xl border border-gray-800 text-lg"
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="p-2 mb-2 w-full rounded-3xl border border-gray-800 text-lg"
              />
              <div className="mb-8">
                <button type="submit" className="w-full p-2 rounded-3xl mt-5 mb-8 bg-black text-white font-bold">
                  Sign up
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm">
              <p>
                Already have an account?{' '}
                <span className="text-blue-500 cursor-pointer" onClick={toggleAuth}>
                  Sign In
                </span>
              </p>
            </div>
          </div>
        </div>
      
    </div>
  );
}

export default AuthPage;
