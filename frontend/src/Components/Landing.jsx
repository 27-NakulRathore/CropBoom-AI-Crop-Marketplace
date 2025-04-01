import React from 'react';
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTractor, faShoppingCart, faRobot, faChartLine, faMobileAlt, faLeaf } from '@fortawesome/free-solid-svg-icons'; // Added faLeaf
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 flex flex-col items-center">
      {/* Header */}
      <header className="flex justify-between items-center p-4 w-full max-w-7xl mx-auto">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faLeaf} size="lg" className="text-green-600 mr-2" /> {/* Added Leaf Logo */}
          <span className="text-xl font-bold text-green-700">CropBoom</span>
        </div>
        <Link to="/signin" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300">
          Sign In
        </Link>
      </header>

      {/* Main Section */}
      <main className="flex-grow flex flex-col justify-center items-center text-center px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="max-w-3xl mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-green-900 leading-tight">
            Welcome to CropBoom
            <br />
            Connecting Farmers and Buyers
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            Join our marketplace to buy and sell fresh, quality crops directly.
          </p>
        </div>

        {/* Register Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 w-full max-w-3xl">
          {/* Register as Farmer */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center border border-gray-300 transform hover:scale-105 h-full">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-500 mb-4">
              <FontAwesomeIcon icon={faTractor} size="lg" />
            </div>
            <h2 className="text-lg font-semibold text-gray-700">Register as a Farmer</h2>
            <p className="text-gray-500 text-sm mb-4">Sell your crops directly.</p>
            <Link to="/register/farmer" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 text-sm">
              Register as Farmer
            </Link>
          </div>

          {/* Register as Buyer */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center border border-gray-300 transform hover:scale-105 h-full">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-500 mb-4">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </div>
            <h2 className="text-lg font-semibold text-gray-700">Register as a Buyer</h2>
            <p className="text-gray-500 text-sm mb-4">Find and purchase crops.</p>
            <Link to="/register/buyer" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 text-sm">
              Register as Buyer
            </Link>
          </div>
        </div>
      </main>

      {/* Bottom Features Section */}
      <div className="w-full bg-green-50 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 md:px-8">
          {/* AI Crop Quality Analysis */}
          <div className="p-6 flex flex-col items-center text-gray-700 text-center">
            <div className="h-16 w-16 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center mb-4">
              <FontAwesomeIcon icon={faRobot} size="lg" />
            </div>
            <h2 className="text-xl font-semibold mb-2">AI Powered Crop Quality Analysis</h2>
            <p className="text-sm">Leverage AI to assess crop quality, ensuring better transparency and trust.</p>
          </div>

          {/* Market Trends */}
          <div className="p-6 flex flex-col items-center text-gray-700 text-center">
            <div className="h-16 w-16 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mb-4">
              <FontAwesomeIcon icon={faChartLine} size="lg" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Market Trends & Pricing</h2>
            <p className="text-sm">Stay updated with real-time market trends for smarter buying and selling.</p>
          </div>

          {/* User-Friendly Application */}
          <div className="p-6 flex flex-col items-center text-gray-700 text-center">
            <div className="h-16 w-16 rounded-full bg-indigo-100 text-indigo-500 flex items-center justify-center mb-4">
              <FontAwesomeIcon icon={faMobileAlt} size="lg" />
            </div>
            <h2 className="text-xl font-semibold mb-2">User-Friendly Application</h2>
            <p className="text-sm">Enjoy a seamless and intuitive experience for easy participation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;