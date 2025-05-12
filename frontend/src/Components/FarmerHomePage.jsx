import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTractor, faSignOutAlt, faCloudUpload, faListAlt, faArrowRight, faUserCircle, faCog, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function FarmerHomePage() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const email = location.state?.email || 'Farmer'; // Default fallback
 
 const listingsurl=`/farmer/crop-listings?email=${encodeURIComponent(email)}`;
  const handleLogout = () => {
    setIsDropdownOpen(false);
    navigate('/');
  };

  const handleEditProfile = () => {
    setIsDropdownOpen(false);
    navigate('/farmer/profile/edit');
  };

  const toggleDropdown = (event) => {
    event.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
        <Link to="/farmer/dashboard" className="flex items-center text-green-700 font-bold text-xl hover:opacity-80">
          <FontAwesomeIcon icon={faTractor} size="lg" className="mr-2" />
          CropBoom
        </Link>

        <div className="flex flex-col items-end">
          <div className="flex items-center text-green-700 font-semibold text-lg">
            <FontAwesomeIcon icon={faTractor} size="lg" className="mr-2" />
            Welcome, Farmer!
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Logged in as: <span className="font-medium">{email}</span>
          </div>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={toggleDropdown} 
            className="focus:outline-none"
            aria-label="User menu"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            <FontAwesomeIcon 
              icon={faUserCircle} 
              size="2x" 
              className="text-gray-600 hover:text-gray-800 cursor-pointer" 
            />
          </button>
          {isDropdownOpen && (
            <div 
              className="absolute top-full right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10"
              role="menu"
            >
              <Link
                to="/farmer/profile"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
                role="menuitem"
              >
                <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                View Profile
              </Link>
              <Link
                to="/farmer/profile/edit"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-100"
                onClick={handleEditProfile}
                role="menuitem"
              >
                <FontAwesomeIcon icon={faCog} className="mr-2" />
                Edit Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block py-2 px-4 text-gray-700 hover:bg-gray-100 w-full text-left focus:outline-none"
                role="menuitem"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Upload Your Crop for Sell Box */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-center items-center p-8">
            <div className="text-green-600 text-6xl mb-6">
              <FontAwesomeIcon icon={faCloudUpload} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Upload Crop</h2>
            <p className="text-gray-600 text-center text-lg mb-6">List your harvested crops for sale.</p>
            <button
              onClick={() => navigate('/farmer/upload-crop', { state: { email } })}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-300 flex items-center"
              aria-label="Upload crops for sale"
            >
              Upload Now
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </button>
          </div>

          {/* My Crop Listing Box */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-center items-center p-8">
            <div className="text-blue-600 text-6xl mb-6">
              <FontAwesomeIcon icon={faListAlt} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">My Listings</h2>
            <p className="text-gray-600 text-center text-lg mb-6">View and manage your listed crops.</p>
            <Link
              to={listingsurl}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-300 flex items-center"
            >
              View Listings
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </Link>
          </div>

          {/* Bookings & Sold Crops Box */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-center items-center p-8">
            <div className="text-purple-600 text-6xl mb-6">
              <FontAwesomeIcon icon={faShoppingBag} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Bookings & Sales</h2>
            <p className="text-gray-600 text-center text-lg mb-6">View your sold crops and buyer bookings.</p>
            <Link
              to="/farmer/bookings"
              state={{ email }}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-300 flex items-center"
              aria-label="View bookings and sales"
            >
              View Bookings
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} CropBoom. All rights reserved.
      </footer>
    </div>
  );
}

FarmerHomePage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      email: PropTypes.string
    })
  })
};

export default FarmerHomePage;