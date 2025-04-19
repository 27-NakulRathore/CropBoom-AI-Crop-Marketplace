import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCog, faSignOutAlt, faCaretDown, faSearch, faLeaf } from '@fortawesome/free-solid-svg-icons';

function BuyerProfile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    console.log('Search term:', e.target.value);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    navigate('/signin');
  };

  const handleEditProfile = () => {
    setIsDropdownOpen(false);
    navigate('/buyer/profile/edit'); // Replace with your actual edit profile route
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
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50">
      <header className="bg-white shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Animated CropBoom Logo */}
          <Link to="/" className="flex items-center">
            <FontAwesomeIcon icon={faLeaf} size="2x" className="text-green-600 mr-2 animate-pulse" />
            <h1 className="text-xl font-bold text-green-700">CropBoom</h1>
          </Link>

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

            {/* Profile Dropdown - Moved to the end */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="focus:outline-none"
              >
                <FontAwesomeIcon icon={faUserCircle} size="2x" className="text-gray-600 hover:text-gray-800 cursor-pointer" />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-md shadow-xl z-10">
                  <Link
                    to="/buyer/profile" // Replace with your actual profile view route
                    className="block py-2 px-4 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                    My Profile
                  </Link>
                  <Link
                    to="/buyer/profile/edit" // Replace with your actual edit profile route
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
                  {/* Add more options here if needed */}
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
              <FontAwesomeIcon icon={faUserCircle} size="lg" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Buyer Profile</h2>
              <p className="text-gray-600">Welcome back, [Buyer Name]</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Add your buyer-specific content here */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Order History</h3>
              <p className="text-gray-600">No recent orders.</p>
              <Link to="/buyer/orders" className="inline-block mt-2 text-green-500 hover:underline">View All Orders</Link>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Saved Addresses</h3>
              <p className="text-gray-600">No saved addresses.</p>
              <Link to="/buyer/addresses" className="inline-block mt-2 text-green-500 hover:underline">Manage Addresses</Link>
            </div>
            {/* Add more sections */}
          </div>
        </section>
      </main>
    </div>
  );
}

export default BuyerProfile;