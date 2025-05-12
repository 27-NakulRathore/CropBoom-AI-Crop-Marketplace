import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLeaf,
    faArrowLeft,
    faMapMarkerAlt,
    faCalendarAlt,
    faMoneyBillWave,
} from '@fortawesome/free-solid-svg-icons';

function BuyNowPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [crop, setCrop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery');

    // Fetch crop details based on URL parameter
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const cropId = searchParams.get('cropId');
        
        if (!cropId) {
            setError('No crop selected');
            setLoading(false);
            return;
        }

        const fetchCropDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/crops/${cropId}`);
                if (!response.ok) throw new Error('Failed to fetch crop details');
                const data = await response.json();
                setCrop(data);
            } catch (err) {
                console.error('Error fetching crop:', err);
                setError('Failed to load crop details');
            } finally {
                setLoading(false);
            }
        };

        fetchCropDetails();
    }, [location.search]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0 && value <= (crop?.quantity || 1)) {
            setQuantity(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!crop) return;
        
        try {
            const orderData = {
                cropId: crop.id,
                farmerId: crop.farmer.id,
                quantity,
                totalPrice: quantity * crop.price,
                deliveryAddress,
                deliveryDate,
                paymentMethod
            };

            // Get buyer email from localStorage
            const buyerEmail = localStorage.getItem('email');
            if (!buyerEmail) {
                throw new Error('Buyer not authenticated');
            }

            const response = await fetch('http://localhost:8080/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...orderData,
                    buyerEmail
                }),
            });

            if (!response.ok) throw new Error('Failed to place order');

            const result = await response.json();
            navigate(`/buyer/orders/${result.id}`, { state: { success: true } });
        } catch (err) {
            console.error('Error placing order:', err);
            alert('Failed to place order. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-green-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading crop details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-green-50 flex items-center justify-center">
                <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
                    <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
                    <p className="text-gray-700 mb-4">{error}</p>
                    <button
                        onClick={() => navigate('/buyer/home')}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    if (!crop) {
        return (
            <div className="min-h-screen bg-green-50 flex items-center justify-center">
                <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Crop Not Found</h2>
                    <p className="text-gray-700 mb-4">The crop you're trying to purchase is not available.</p>
                    <button
                        onClick={() => navigate('/buyer/home')}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                        Browse Available Crops
                    </button>
                </div>
            </div>
        );
    }

    const totalPrice = quantity * crop.price;

    return (
        <div className="min-h-screen bg-green-50">
            {/* Header */}
            <header className="bg-white shadow px-6 py-4">
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-green-700 font-bold text-xl flex items-center hover:opacity-80"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                        Back
                    </button>
                    <div className="text-green-700 font-bold text-2xl flex items-center">
                        <FontAwesomeIcon icon={faLeaf} className="mr-2 text-green-600" />
                        CropBoom
                    </div>
                    <div className="w-8"></div> {/* Spacer for alignment */}
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Purchase</h1>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Crop Details */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            
                            <div className="flex items-start mb-6">
                                <div className="w-24 h-24 rounded-md overflow-hidden mr-4">
                                    <img
                                        src={`data:image/jpeg;base64,${crop.cropImage}`}
                                        alt={crop.cropName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{crop.cropName}</h3>
                                    <p className="text-gray-600 text-sm mb-1">Sold by: {crop.farmer?.name || 'Farmer'}</p>
                                    <p className="text-gray-600 text-sm">Location: {crop.address}</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Price per {crop.unit}:</span>
                                    <span className="font-medium">₹{crop.price}</span>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Quantity:</span>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-8 h-8 border rounded-l-md flex items-center justify-center hover:bg-gray-100"
                                            disabled={quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            min="1"
                                            max={crop.quantity}
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            className="w-12 h-8 border-t border-b text-center"
                                        />
                                        <button
                                            onClick={() => setQuantity(Math.min(crop.quantity, quantity + 1))}
                                            className="w-8 h-8 border rounded-r-md flex items-center justify-center hover:bg-gray-100"
                                            disabled={quantity >= crop.quantity}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="border-t pt-4">
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total:</span>
                                        <span>₹{totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Order Form */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="address">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                                        Delivery Address
                                    </label>
                                    <textarea
                                        id="address"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        rows="3"
                                        value={deliveryAddress}
                                        onChange={(e) => setDeliveryAddress(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="date">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                                        Preferred Delivery Date
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        value={deliveryDate}
                                        onChange={(e) => setDeliveryDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </div>
                                
                                <div className="mb-6">
                                    <label className="block text-gray-700 mb-2">
                                        <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" />
                                        Payment Method
                                    </label>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio text-green-600"
                                                name="paymentMethod"
                                                value="cash_on_delivery"
                                                checked={paymentMethod === 'cash_on_delivery'}
                                                onChange={() => setPaymentMethod('cash_on_delivery')}
                                            />
                                            <span className="ml-2">Cash on Delivery</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio text-green-600"
                                                name="paymentMethod"
                                                value="online_payment"
                                                checked={paymentMethod === 'online_payment'}
                                                onChange={() => setPaymentMethod('online_payment')}
                                            />
                                            <span className="ml-2">Online Payment (Coming Soon)</span>
                                        </label>
                                    </div>
                                </div>
                                
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium transition duration-200"
                                >
                                    Confirm Purchase (₹{totalPrice.toFixed(2)})
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default BuyNowPage;