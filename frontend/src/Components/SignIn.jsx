import React, { useState } from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTractor, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function SignIn() {
  const [isFarmer, setIsFarmer] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Signing in as', isFarmer ? 'Farmer' : 'Buyer', 'with:', email, password);
    if (isFarmer) {
      navigate('/farmer/dashboard');
    } else {
      navigate('/buyer/dashboard');
    }
  };

  const handleRoleChange = (value) => {
    setIsFarmer(value === 'farmer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sign In as {isFarmer ? 'Farmer' : 'Buyer'}
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Sign In As:
          </label>
          <div className="flex justify-around">
            <div className="flex items-center">
              <input
                type="radio"
                id="buyer"
                name="role"
                value="buyer"
                className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                checked={!isFarmer}
                onChange={(e) => handleRoleChange(e.target.value)}
              />
              <label htmlFor="buyer" className="ml-2 text-gray-700">
                <FontAwesomeIcon icon={faShoppingCart} className="mr-1" /> Buyer
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="farmer"
                name="role"
                value="farmer"
                className="form-radio h-4 w-4 text-green-600 transition duration-150 ease-in-out"
                checked={isFarmer}
                onChange={(e) => handleRoleChange(e.target.value)}
              />
              <label htmlFor="farmer" className="ml-2 text-gray-700">
                <FontAwesomeIcon icon={faTractor} className="mr-1" /> Farmer
              </label>
            </div>
          </div>
        </div>

        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800" href="#forgot">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;