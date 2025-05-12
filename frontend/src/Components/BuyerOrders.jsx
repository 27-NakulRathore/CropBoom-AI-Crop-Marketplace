import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLeaf,
    faSignOutAlt,
    faUserCircle,
    faCog,
    faSearch,
    faBoxOpen,
    faMapMarkerAlt,
    faShoppingCart,
    faClock,
    faCheckCircle,
    faTruck,
    faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

function BuyerOrders() {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [buyer, setBuyer] = useState(null);
    const [cartCount, setCartCount] = useState(0);

    // Initialize cart count from localStorage
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartCount(cart.length);
    }, []);

    useEffect(() => {
        const email = localStorage.getItem("email");
        if (email) {
            fetch(`http://localhost:8080/api/buyer/${email}`)
                .then(res => res.json())
                .then(data => setBuyer(data))
                .catch(err => console.error("Failed to load buyer", err));
        }
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const email = localStorage.getItem("email");
                if (!email) {
                    navigate('/signin');
                    return;
                }
                
                const response = await fetch(`http://localhost:8080/api/orders/buyer/${email}`);
                if (!response.ok) throw new Error("Failed to fetch orders");
                const data = await response.json();
                setOrders(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError("Failed to load orders");
                setLoading(false);
            }
        };
        fetchOrders();
    }, [navigate]);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleLogout = () => {
        localStorage.removeItem('email');
        navigate('/signin');
    };

    const handleEditProfile = () => {
        navigate('/buyer/profile/edit');
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'PENDING':
                return <FontAwesomeIcon icon={faClock} className="text-yellow-500 mr-2" />;
            case 'PROCESSING':
                return <FontAwesomeIcon icon={faTruck} className="text-blue-500 mr-2" />;
            case 'DELIVERED':
                return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />;
            case 'CANCELLED':
                return <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 mr-2" />;
            default:
                return <FontAwesomeIcon icon={faClock} className="text-gray-500 mr-2" />;
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="min-h-screen bg-green-50 flex flex-col">
            {/* Navbar */}
            <header className="bg-white shadow px-6 py-4">
                <div className="flex justify-between items-center">
                    <Link
                        to="/buyer/home"
                        className="text-green-700 font-bold text-2xl flex items-center hover:opacity-80"
                    >
                        <FontAwesomeIcon icon={faLeaf} className="mr-2 text-green-600 animate-pulse" />
                        CropBoom
                    </Link>

                    {/* Search Bar */}
                    <div className="w-full max-w-md mx-4 relative">
                        <input
                            type="text"
                            placeholder="Search for crops..."
                            className="w-full py-2 px-4 pl-10 rounded-full border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>

                    {/* Cart and Profile */}
                    <div className="flex items-center space-x-4">
                        <Link to="/buyer/cart" className="text-gray-600 hover:text-gray-800 relative">
                            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <div className="relative">
                            <button onClick={toggleDropdown} className="flex items-center">
                                <FontAwesomeIcon
                                    icon={faUserCircle}
                                    size="lg"
                                    className="text-gray-600 hover:text-gray-800"
                                />
                                <span className="ml-2 hidden md:inline">
                                    {buyer?.name || 'Profile'}
                                </span>
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md z-50 overflow-hidden">
                                    <div className="px-4 py-3 border-b">
                                        <p className="font-medium">{buyer?.name || 'User'}</p>
                                        <p className="text-sm text-gray-600 truncate">{buyer?.email || ''} </p>
                                    </div>
                                    <Link
                                        to="/buyer/profile"
                                        className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                                    >
                                        <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                                        My Profile
                                    </Link>
                                    <button
                                        onClick={handleEditProfile}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                                    >
                                        <FontAwesomeIcon icon={faCog} className="mr-2" />
                                        Edit Profile
                                    </button>
                                    <Link
                                        to="/buyer/orders"
                                        className="block px-4 py-2 hover:bg-gray-100 text-gray-700 bg-gray-100"
                                    >
                                        <FontAwesomeIcon icon={faBoxOpen} className="mr-2" />
                                        Order History
                                    </Link>
                                    <Link
                                        to="/buyer/addresses"
                                        className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                                    >
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                                        Saved Addresses
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 border-t"
                                    >
                                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6 flex-grow">
                {/* Welcome Section */}
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex items-center mb-4 md:mb-0">
                            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                                <FontAwesomeIcon icon={faBoxOpen} size="lg" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">Your Orders</h2>
                                <p className="text-gray-600">View and track your order history</p>
                            </div>
                        </div>
                        <Link
                            to="/BuyerHomePage"
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center justify-center"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>

                {/* Orders Section */}
                <section className="bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-800">Order History</h3>
                        <div className="text-sm text-gray-500">
                            Showing {orders.length} orders
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-12">
                            <FontAwesomeIcon icon={faBoxOpen} className="text-gray-300 text-5xl mb-4" />
                            <h4 className="text-xl font-medium text-gray-600">No orders found</h4>
                            <p className="text-gray-500 mt-2">You haven't placed any orders yet.</p>
                            <Link
                                to="/BuyerHomePage"
                                className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="border rounded-lg overflow-hidden">
                                    <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                                        <div>
                                            <span className="font-medium">Order #{order.id}</span>
                                            <span className="text-gray-500 text-sm ml-4">
                                                Placed on {formatDate(order.orderDate)}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            {getStatusIcon(order.status)}
                                            <span className="font-medium capitalize">{order.status.toLowerCase()}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="md:col-span-2">
                                                <h4 className="font-medium mb-4">Order Items</h4>
                                                <div className="space-y-4">
                                                    {order.items.map((item) => (
                                                        <div key={item.id} className="flex border-b pb-4">
                                                            <div className="w-20 h-20 rounded-md overflow-hidden mr-4">
                                                                <img
                                                                    src={`data:image/jpeg;base64,${item.cropImage}`}
                                                                    alt={item.cropName}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div className="flex-grow">
                                                                <h5 className="font-medium">{item.cropName}</h5>
                                                                <p className="text-sm text-gray-600">Sold by: {item.farmerName}</p>
                                                                <p className="text-sm text-gray-600">
                                                                    {item.quantity} {item.unit} × ₹{item.pricePerUnit}
                                                                </p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="font-medium">₹{item.totalPrice}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <div className="border-l pl-6">
                                                <h4 className="font-medium mb-4">Order Summary</h4>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Subtotal</span>
                                                        <span>₹{order.subtotal}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Shipping</span>
                                                        <span>₹{order.shippingFee}</span>
                                                    </div>
                                                    <div className="flex justify-between border-t pt-2">
                                                        <span className="font-medium">Total</span>
                                                        <span className="font-medium">₹{order.totalAmount}</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="mt-6">
                                                    <h4 className="font-medium mb-2">Delivery Address</h4>
                                                    <p className="text-sm text-gray-600">
                                                        {order.deliveryAddress?.name}<br />
                                                        {order.deliveryAddress?.street}<br />
                                                        {order.deliveryAddress?.city}, {order.deliveryAddress?.state}<br />
                                                        {order.deliveryAddress?.pincode}<br />
                                                        Phone: {order.deliveryAddress?.phone}
                                                    </p>
                                                </div>
                                                
                                                {order.status === 'DELIVERED' && (
                                                    <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
                                                        Buy Again
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            {/* Footer */}
            <footer className="text-center text-gray-500 py-4 text-sm bg-gray-100">
                © {new Date().getFullYear()} CropBoom. All rights reserved.
            </footer>
        </div>
    );
}

export default BuyerOrders;