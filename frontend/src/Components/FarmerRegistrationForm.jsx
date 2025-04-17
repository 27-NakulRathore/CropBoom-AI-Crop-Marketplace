import React, { useState } from 'react';
import '../index.css';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faTractor } from '@fortawesome/free-solid-svg-icons'; // Added faTractor

function FarmerRegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');
  const navigate = useNavigate();

  const validateName = (name) => {
    return name.trim() !== '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateLocation = (location) => {
    return location.trim() !== '';
  };

  const validateContactNumber = (number) => {
    const phoneRegex = /^[0-9]{10}$/; // Basic 10-digit number validation
    return phoneRegex.test(number);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!validateName(name)) {
      setNameError('Name is required.');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!validateLocation(location)) {
      setLocationError('Location is required.');
      isValid = false;
    } else {
      setLocationError('');
    }

    if (!validateContactNumber(contactNumber)) {
      setContactNumberError('Please enter a valid 10-digit contact number.');
      isValid = false;
    } else {
      setContactNumberError('');
    }

    if (isValid) {
      console.log('Registering Farmer:', { name, email, password, location, contactNumber });
      try {
        const response = await fetch('http://localhost:8080/api/register/farmer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
            location,
            contactNumber,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Success:', result);
          navigate('/farmer/dashboard');
        } else {
          console.error('Failed to register farmer. Status:', response.status);
          // Optionally set an error message to display to the user
        }
      } catch (error) {
        console.error('Error:', error);
        // Optionally set an error message to display to the user
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 flex justify-center items-center p-4 md:p-10">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 max-w-md w-full animate-fade-in">
        <div className="text-center mb-6">
          <FontAwesomeIcon icon={faLeaf} size="2x" className="text-green-600 mb-2 animate-pulse shadow-md rounded-full bg-white p-2" />
          <h1 className="text-2xl font-bold text-green-700">CropBoom</h1>
          <div className="flex items-center justify-center mt-2">
            <FontAwesomeIcon icon={faTractor} size="lg" className="text-green-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Farmer Registration</h2>
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex items-center">
            <label className="block text-gray-700 text-sm font-bold w-1/3 text-right mr-3" htmlFor="name">
              Name:
            </label>
            <input
              className={`shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${nameError ? 'border-red-500' : 'border-gray-300 focus:border-green-500'}`}
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {nameError && <p className="text-red-500 text-xs italic ml-2">{nameError}</p>}
          </div>
          <div className="flex items-center">
            <label className="block text-gray-700 text-sm font-bold w-1/3 text-right mr-3" htmlFor="email">
              Email:
            </label>
            <input
              className={`shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${emailError ? 'border-red-500' : 'border-gray-300 focus:border-green-500'}`}
              id="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="text-red-500 text-xs italic ml-2">{emailError}</p>}
          </div>
          <div className="flex items-center">
            <label className="block text-gray-700 text-sm font-bold w-1/3 text-right mr-3" htmlFor="password">
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-300 focus:border-green-500"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Consider adding password strength validation here as well */}
          </div>
          <div className="flex items-center">
            <label className="block text-gray-700 text-sm font-bold w-1/3 text-right mr-3" htmlFor="location">
              Location:
            </label>
            <input
              className={`shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${locationError ? 'border-red-500' : 'border-gray-300 focus:border-green-500'}`}
              id="location"
              type="text"
              placeholder="Farm Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            {locationError && <p className="text-red-500 text-xs italic ml-2">{locationError}</p>}
          </div>
          <div className="flex items-center">
            <label className="block text-gray-700 text-sm font-bold w-1/3 text-right mr-3" htmlFor="contactNumber">
              Contact No.:
            </label>
            <input
              className={`shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${contactNumberError ? 'border-red-500' : 'border-gray-300 focus:border-green-500'}`}
              id="contactNumber"
              type="tel"
              placeholder="Your Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
            {contactNumberError && <p className="text-red-500 text-xs italic ml-2">{contactNumberError}</p>}
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4"
          >
            Register
          </button>
          <div className="text-center mt-4">
            <Link to="/signin" className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800">
              Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FarmerRegistrationForm;