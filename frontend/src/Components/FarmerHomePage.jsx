import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link ,useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTractor, faSignOutAlt, faCloudUpload, faListAlt, faArrowRight, faUserCircle, faCog } from '@fortawesome/free-solid-svg-icons'; // Added faUserCircle and faCog

function FarmerHomePage() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const email = location.state?.email;

  const handleLogout = () => {
    setIsDropdownOpen(false);
    // In a real application, you would handle your actual logout logic here,
    // such as clearing user tokens or session data.
    navigate('/'); // Navigate to the landing page (or your sign-in page if that's your landing)
  };

  const handleEditProfile = () => {
    setIsDropdownOpen(false);
    // Navigate to the edit profile page
    navigate('/farmer/profile/edit'); // Replace with your actual edit profile route
  };

  const toggleDropdown = () => {
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
  }, [dropdownRef]);

  return (
    
    <div className="min-h-screen bg-green-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
        {/* Left Side: CropBoom Logo and Name */}
        <Link to="/farmer/dashboard" className="flex items-center text-green-700 font-bold text-xl hover:opacity-80">
          <FontAwesomeIcon icon={faTractor} size="lg" className="mr-2" />
          CropBoom
        </Link>

        {/* Center: Welcome Farmer with Logo */}
        <div className="flex items-center text-green-700 font-semibold text-lg">
          <FontAwesomeIcon icon={faTractor} size="lg" className="mr-2" />
          Welcome, Farmer!
        </div>
        <div className="text-sm text-gray-600 mt-1">
  Logged in as: <span className="font-medium">{email}</span>
</div>

        {/* Right Side: Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="focus:outline-none"
          >
            <FontAwesomeIcon icon={faUserCircle} size="2x" className="text-gray-600 hover:text-gray-800 cursor-pointer" />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
              <Link
                to="/farmer/profile" // Replace with your actual profile view route
                className="block py-2 px-4 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                View Profile
              </Link>
              <Link
                to="/farmer/profile/edit" // Replace with your actual edit profile route
                className="block py-2 px-4 text-gray-700 hover:bg-gray-100"
                onClick={handleEditProfile}
              >
                <FontAwesomeIcon icon={faCog} className="mr-2" />
                Edit Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block py-2 px-4 text-gray-700 hover:bg-gray-100 w-full text-left focus:outline-none"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-3xl">
          {/* Upload Your Crop for Sell Box */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-center items-center p-12 aspect-w-1 aspect-h-1">
            <div className="text-green-600 text-6xl mb-6">
              <FontAwesomeIcon icon={faCloudUpload} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Upload Crop</h2>
            <p className="text-gray-600 text-center text-lg mb-6">List your harvested crops for sale.</p>
            <button
  onClick={() => navigate('/farmer/upload-crop', { state: { email } })}
  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-300 flex items-center"
>
  Upload Now
  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
</button>
          </div>

          {/* My Crop Listing Box */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-center items-center p-12 aspect-w-1 aspect-h-1">
            <div className="text-blue-600 text-6xl mb-6">
              <FontAwesomeIcon icon={faListAlt} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">My Listings</h2>
            <p className="text-gray-600 text-center text-lg mb-6">View and manage your listed crops.</p>
            <Link
              to="/farmer/crop-listings"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-300 flex items-center"
            >
              View Listings
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer (Optional) */}
      <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} CropBoom. All rights reserved.
      </footer>
    </div>
  );
}

export default FarmerHomePage;