import React, { useState } from 'react';
import '../index.css';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTractor, faShoppingCart, faLeaf, faEye } from '@fortawesome/free-solid-svg-icons'; // Added faLeaf and faEye

function SignIn() {
  const [isFarmer, setIsFarmer] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful. Role:', data.role);
  
        if (data.role === 'farmer') {
          navigate('/farmer/dashboard');
        } else if (data.role === 'buyer') {
          navigate('/buyer/dashboard');
        }
      } else {
        const errorText = await response.text();
        alert(`Login failed: ${errorText}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again.');
    }
  };
  

  const handleRoleChange = (value) => {
    setIsFarmer(value === 'farmer');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 max-w-md w-full animate-fade-in"> {/* White box container with Tailwind */}
        {/* CropBoom Logo and Name */}
        <div className="text-center mb-6">
          <FontAwesomeIcon icon={faLeaf} size="2x" className="text-green-600 mb-2 animate-pulse shadow-md rounded-full bg-white p-2" />
          <h1 className="text-2xl font-bold text-green-700">CropBoom</h1>
          <p className="text-gray-600">It's good to have you back!</p> {/* Added the welcome text */}
        </div>

        {/* Sign In As Section */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 text-center">
            Sign In As:
          </label>
          <div className="flex justify-around">
            <label className={`flex items-center cursor-pointer px-4 py-2 rounded-md transition-colors duration-300 ${!isFarmer ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-blue-700'}`}>
              <input
                type="radio"
                id="buyer"
                name="role"
                value="buyer"
                className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out mr-2"
                checked={!isFarmer}
                onChange={(e) => handleRoleChange(e.target.value)}
              />
              Buyer
            </label>
            <label className={`flex items-center cursor-pointer px-4 py-2 rounded-md transition-colors duration-300 ${isFarmer ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:text-green-700'}`}>
              <input
                type="radio"
                id="farmer"
                name="role"
                value="farmer"
                className="form-radio h-4 w-4 text-green-600 transition duration-150 ease-in-out mr-2"
                checked={isFarmer}
                onChange={(e) => handleRoleChange(e.target.value)}
              />
              Farmer
            </label>
          </div>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-green-300 focus:border-green-500"
              id="email"
              type="email"
              placeholder="Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-green-300 focus:border-green-500"
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={faEye} className="h-5 w-5" />
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Sign In
          </button>
          <div className="text-center mt-4">
            <Link to="/forgot-password" className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;