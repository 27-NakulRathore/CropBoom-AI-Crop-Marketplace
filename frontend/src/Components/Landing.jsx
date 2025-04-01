import React from 'react';
import '../index.css'; // Import your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTractor, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 flex flex-col items-center">
      <header className="flex justify-between items-center p-4 w-full max-w-7xl mx-auto">
        <div className="flex items-center">
          <span className="text-xl font-bold text-green-700">CropBoom</span>
        </div>
        <div>
          <Link
            to="/signin"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
          >
            Sign In
          </Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col justify-center items-center text-center px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-green-900 leading-tight">
            Welcome to CropBoom
            <br />
            Connecting Farmers and Buyers
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-700">
            Join our marketplace to buy and sell fresh, quality crops directly.
          </p>
        </div>

        <div className="flex flex-col md:flex-row space-y-4 md:space-x-8"> {/* Increased space between boxes */}
          {/* Register as Farmer Box */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 w-full md:w-96 flex flex-col items-center"> {/* Aligned items to center */}
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-500 mb-4">
              <FontAwesomeIcon icon={faTractor} size="lg" /> {/* Farmer Logo */}
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Register as a Farmer
            </h2>
            <p className="text-gray-500 mb-4">
              Sell your crops directly to a wide network of buyers.
            </p>
            <Link
              to="/register/farmer"
              className="block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
            >
              Register as Farmer
            </Link>
          </div>

          {/* Register as Buyer Box */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 w-full md:w-96 flex flex-col items-center"> {/* Aligned items to center */}
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-500 mb-4">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" /> {/* Buyer Logo */}
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Register as a Buyer
            </h2>
            <p className="text-gray-500 mb-4">
              Find and purchase fresh, high-quality crops from local farmers.
            </p>
            <Link
              to="/register/buyer"
              className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
            >
              Register as Buyer
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Landing;