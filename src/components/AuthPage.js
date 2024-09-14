import React, { useState } from 'react';
import image from './SIGNINside.png';
import bgi from './bgci.jpg';

function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const toggleAuth = () => {
    setIsSignIn(!isSignIn);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://192.168.56.1:5000/register', { // Use the correct IP and port
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Account created successfully!');
      } else {
        alert(result.message || 'Failed to create account.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create account. Please try again.');
    }
  };

  return (
    <div className="w-[80%] h-[70vh] relative p-5 flex overflow-hidden rounded-xl"
      // style={{ backgroundImage: `url(${bgi})` }}
    >
      <div
        className={`z-50 absolute top-0 right-0 w-[45%] h-[95%] bg-cover transition-transform duration-1000 ease-in-out bg-indigo-50 p-5 rounded-2xl mt-5`}
        style={{
          transform: isSignIn ? 'translateX(-3%)' : 'translateX(-119%)',
          backgroundImage: `url(${image})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      >
        <div
          className="w-[100%] h-{100%}"
          style={{ backgroundImage: `url(${image})`}}
        />
      </div>

      {/* Sign In Form */}
      {isSignIn && (
        <div className={`absolute top-0 left-0 w-1/2 h-full flex items-center justify-center p-6 bg-white z-10`}>
          <div className="w-full max-w-sm">
            <div className="flex items-center justify-center flex-col">
              <h1 className="text-5xl font-bold mb-6">Welcome Back!</h1>
              <p className="text-lg mb-20 text-center">Simplify your workflow and boost your support with <span className="font-bold">NEXA AI</span> Bot</p>
            </div>
            <div className="mb-2">
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                className="p-4 mb-4 w-full rounded-3xl border border-gray-800 text-lg"
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="p-4 mb-4 w-full rounded-3xl border border-gray-800 text-lg"
              />
              <p className="text-right cursor-pointer text-sm">Forgot Password?</p>
            </div>
            <div className="mb-10">
              <button className="w-full p-4 rounded-3xl mt-5 mb-10 bg-black text-white font-bold">Log in</button>
            </div>
            <div className="mt-20 text-sm flex items-center justify-center">
              <p>
                Not a member?{' '}
                <span className="text-blue-500 cursor-pointer" onClick={toggleAuth}>
                  Register now
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sign Up Form */}
      {!isSignIn && (
        <div className={`absolute top-0 right-0 w-1/2 h-full flex items-center justify-center p-6 bg-white z-10`}>
          <div className="w-full max-w-sm">
            <div className="flex items-center justify-center flex-col">
              <h1 className="text-5xl font-bold mb-6 text-center">Create an Account</h1>
              <p className="text-lg mb-20 text-center">Join <span className="font-bold">NEXA AI</span> Bot and boost your productivity</p>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="p-4 mb-4 w-full rounded-3xl border border-gray-800 text-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="p-4 mb-4 w-full rounded-3xl border border-gray-800 text-lg"
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="p-4 mb-4 w-full rounded-3xl border border-gray-800 text-lg"
              />
              <div className="mb-10">
                <button type="submit" className="w-full p-4 rounded-3xl mt-5 mb-10 bg-black text-white font-bold">Sign up</button>
              </div>
              <div className="mt-4 text-sm">
                <p>
                  Already have an account?{' '}
                  <span className="text-blue-500 cursor-pointer" onClick={toggleAuth}>
                    Sign In
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthPage;
