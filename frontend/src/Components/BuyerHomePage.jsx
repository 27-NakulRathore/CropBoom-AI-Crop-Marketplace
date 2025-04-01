import React, { useState } from 'react';
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faHistory, faMapMarkerAlt, faShoppingCart, faCaretDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function BuyerProfile() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Add state for search term

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50">
      <header className="bg-white shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-green-700">CropBoom</h1>
          <div className="flex items-center">
            {/* Search Bar */}
            <div className="relative w-full md:w-2/3 lg:w-1/2 mr-4">
              <input
                type="text"
                placeholder="Search for crops..."
                className="block w-full border rounded-md py-2 px-3 pl-10 focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              </div>
            </div>

            {/* Cart Icon and Link */}
            <Link to="/cart" className="relative mr-4">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md">
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                My Cart
              </button>
              {/* Add cart item count here if needed */}
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md"
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Profile
                <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-10">
                  <Link to="/profile" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">
                    My Profile
                  </Link>
                  <Link to="/settings" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">
                    Settings
                  </Link>
                  <Link to="/logout" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">
                    Logout
                  </Link>
                  {/* Add more options here */}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-6">
        <section className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faUser} size="lg" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Buyer Profile</h2>
              <p className="text-gray-600">Welcome back, [Buyer Name]</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ... (rest of your profile content) ... */}
          </div>
        </section>
      </main>
    </div>
  );
}

export default BuyerProfile;