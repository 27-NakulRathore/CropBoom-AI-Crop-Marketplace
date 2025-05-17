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
    const [crops, setCrops] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const unitConversionToKg = {
        kg: 1,
        quintal: 100,
        ton: 1000
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const cropId = searchParams.get('cropId');

        const fetchCropDetails = async (id) => {
            try {
                const response = await fetch(`http://localhost:8080/api/crops/${id}`);
                if (!response.ok) throw new Error('Failed to fetch crop details');
                const data = await response.json();
                setCrops([data]);
                setQuantities({ [data.id]: 1 });
            } catch (err) {
                console.error('Error fetching crop:', err);
                setError('Failed to load crop details');
            } finally {
                setLoading(false);
            }
        };

        if (cropId) {
            fetchCropDetails(cropId);
        } else if (location.state?.cartItems?.length > 0) {
            setCrops(location.state.cartItems);
            const initialQuantities = {};
            location.state.cartItems.forEach(item => {
                initialQuantities[item.id] = item.selectedQuantity || item.quantity || 1;
            });
            setQuantities(initialQuantities);
            setLoading(false);
        } else {
            setError('No crop or cart data provided');
            setLoading(false);
        }
    }, [location.search, location.state]);

    const calculateTotal = () => {
    return crops.reduce((sum, item) => {
        const quantity = quantities[item.id] || 1;

        let numericPrice = 0;

        if (item.price && item.price > 0) {
            numericPrice = item.price;
        } else if (item.priceRange) {
            const parts = item.priceRange.split('-').map(p => parseFloat(p));
            if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                numericPrice = (parts[0] + parts[1]) / 2;
            }
        }

        return sum + numericPrice * quantity;
    }, 0).toFixed(2);
    };


    const handleSubmit = async (e) => {
    e.preventDefault();

    const buyerEmail = localStorage.getItem('email');
    if (!buyerEmail) {
        alert('Buyer not authenticated');
        return;
    }

    try {
        const orders = crops.map(crop => {
            const unit = crop.unit.toLowerCase();
            const conversionFactor = unitConversionToKg[unit] || 1;
            const quantityInKg = (quantities[crop.id] || 1) * conversionFactor;

            let price = (crop.price !== null && crop.price !== undefined) ? crop.price : crop.priceRange;
            let numericPrice = 0;

            if (typeof price === 'string') {
                const parts = price.split('-').map(p => parseFloat(p));
                numericPrice = parts.length === 2
                    ? (parts[0] + parts[1]) / 2
                    : parseFloat(price);
            } else {
                numericPrice = price || 0;
            }

            return {
                cropId: crop.id,
                farmerId: crop.farmer.id,
                quantity: quantityInKg,
                totalPrice: quantityInKg * numericPrice,
                deliveryAddress,
                deliveryDate,
                paymentMethod,
                buyerEmail
            };
        });

            const response = await fetch('http://localhost:8080/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orders }),  // Wrap in object
            });

            if (!response.ok) throw new Error('Order failed');

            navigate('/buyer/orders', { state: { success: true } });
        } catch (err) {
            console.error('Error placing orders:', err);
            alert('Failed to place orders. Please try again.');
        }
    };


    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-green-50">
                <div>Loading crop details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-green-50">
                <div className="p-6 bg-white shadow rounded text-center">
                    <p className="text-red-600 font-semibold">{error}</p>
                    <button onClick={() => navigate('/BuyerHomePage')} className="mt-4 px-4 py-2 bg-green-600 text-white rounded">
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-green-50">
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
                    <div className="w-8"></div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Purchase</h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        {crops.map(crop => (
                            <div key={crop.id} className="bg-white p-4 rounded shadow mb-4">
                                <div className="flex items-start mb-4">
                                    <img
                                        src={`data:image/jpeg;base64,${crop.cropImage}`}
                                        alt={crop.cropName}
                                        className="w-24 h-24 rounded object-cover mr-4"
                                    />
                                    <div>
                                        <h3 className="font-bold">{crop.cropName}</h3>
                                        <p className="text-sm text-gray-600">Sold by: {crop.farmer.name}</p>
                                        <p className="text-sm text-gray-600">Location: {crop.address}</p>
                                        {(!crop.price || crop.price <= 0) && !crop.priceRange ? (
                                            '⚠️ Price not available'
                                        ) : (
                                            `Price per ${crop.unit}: ₹${
                                                crop.price > 0
                                                    ? crop.price
                                                    : (() => {
                                                        const parts = crop.priceRange?.split('-').map(p => parseFloat(p));
                                                        return parts && parts.length === 2
                                                            ? ((parts[0] + parts[1]) / 2).toFixed(2)
                                                            : crop.priceRange || 'N/A';
                                                    })()
                                            }`
                                        )}

                                    </div>
                                </div>

                                <div className="mt-2 text-sm text-gray-700 flex items-center">
                                    <label htmlFor={`qty-${crop.id}`} className="mr-2 font-semibold">Quantity:</label>
                                    <input
                                        type="number"
                                        id={`qty-${crop.id}`}
                                        min="1"
                                        max={crop.availableQuantity}
                                        value={quantities[crop.id] || 1}
                                        onChange={(e) => {
                                            let val = parseInt(e.target.value, 10);
                                            if (isNaN(val) || val < 1) val = 1;
                                            if (val > crop.availableQuantity) val = crop.availableQuantity;
                                            setQuantities(prev => ({ ...prev, [crop.id]: val }));
                                        }}
                                        className="border border-gray-300 rounded px-2 py-1 w-20"
                                    />
                                    <span className="ml-2">{crop.unit}</span>
                                </div>

                                <p className="text-xs text-green-600 mt-1 ml-1">
                                    Please confirm your quantity. Maximum available: {crop.availableQuantity} {crop.unit}.
                                </p>
                            </div>
                        ))}

                        <div className="mt-6 text-right text-lg font-semibold">
                            Total: ₹{calculateTotal()}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="address">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                                Delivery Address
                            </label>
                            <textarea
                                id="address"
                                className="w-full border p-2 rounded"
                                rows="3"
                                value={deliveryAddress}
                                onChange={(e) => setDeliveryAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="date">
                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                                Delivery Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                className="w-full border p-2 rounded"
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
                                        name="paymentMethod"
                                        value="cash_on_delivery"
                                        checked={paymentMethod === 'cash_on_delivery'}
                                        onChange={() => setPaymentMethod('cash_on_delivery')}
                                        className="mr-2"
                                    />
                                    Cash on Delivery
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="online_payment"
                                        disabled
                                        className="mr-2"
                                    />
                                    Online Payment (Coming Soon)
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium transition duration-200"
                        >
                            Confirm Purchase (₹{calculateTotal()})
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default BuyNowPage;
