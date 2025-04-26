import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faSignOutAlt, faUserCircle, faCog, faSearch } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion'; // For animation

function BuyerProfile() {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        setIsDropdownOpen(false);
        navigate('/signin');
    };

    const handleEditProfile = () => {
        setIsDropdownOpen(false);
        navigate('/buyer/profile/edit');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = () => {
        // In a real application, you'd perform the search here.
        console.log('Searching for:', searchTerm);
        //  navigate(`/search?query=${searchTerm}`);  <--  Example of navigation
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
            <header className="bg-white shadow-md py-4 px-6">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Left Side: CropBoom Logo and Name */}
                    <Link to="/buyer/home" className="flex items-center text-green-700 font-bold text-xl hover:opacity-80">
                        <FontAwesomeIcon icon={faLeaf} size="lg" className="mr-2 animate-pulse" />
                        CropBoom
                    </Link>

                    {/* Center: Search Bar */}
                    <div className="flex-grow px-4 md:px-8 lg:px-12">
                        <div className="relative w-full max-w-md mx-auto">
                            <input
                                type="text"
                                placeholder="Search for crops..."
                                className="block w-full border rounded-full py-2 px-6 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <motion.button // Animated search icon
                                type="submit"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 focus:outline-none"
                                onClick={handleSearchSubmit}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
                            </motion.button>
                        </div>
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
                                    to="/buyer/profile"
                                    className="block py-2 px-4 text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                                    My Profile
                                </Link>
                                <Link
                                    to="/buyer/profile/edit"
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
                </div>
            </header>

            {/* Main Content */}
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

            {/* Footer (Optional) */}
            <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
                &copy; {new Date().getFullYear()} CropBoom. All rights reserved.
            </footer>
        </div>
    );
}

export default BuyerProfile;
