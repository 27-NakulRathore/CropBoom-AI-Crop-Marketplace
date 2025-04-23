import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faToggleOn, faToggleOff, faEye, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Assuming you use axios for API calls

function MyCropListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/farmer/listings'); // Replace with your actual API endpoint
        setListings(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch listings');
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading your listings...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }

  if (!Array.isArray(listings) || listings.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        {error ? (
          <p>Error loading listings: {error}</p>
        ) : (
          <p>You haven't listed any crops yet.</p>
        )}
        <Link to="/farmer/upload-crop" className="text-green-500 hover:underline mt-2 inline-block">
          Upload Your First Crop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">My Crop Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map(listing => (
          <div key={listing.id} className="bg-white rounded-lg shadow-md p-4">
            {listing.imageUrl && <img src={listing.imageUrl} alt={listing.cropName} className="w-full h-32 object-cover rounded-md mb-2" />}
            <h3 className="font-semibold text-lg text-gray-800">{listing.cropName}</h3>
            <p className="text-gray-600">{listing.quantity} {listing.unit}</p>
            {listing.pricePerKg !== null && <p className="text-green-500 font-semibold">₹{listing.pricePerKg}/kg</p>}
            <p className="text-sm text-gray-500">Listed on: {new Date(listing.listedOn).toLocaleDateString()}</p>
            <p className={`text-sm font-semibold ${listing.status === 'active' ? 'text-green-600' : listing.status === 'inactive' ? 'text-gray-600' : 'text-red-600'}`}>
              Status: {listing.status}
            </p>
            <div className="mt-4 flex space-x-2">
              <Link to={`/farmer/listings/${listing.id}`} className="text-blue-500 hover:underline">
                <FontAwesomeIcon icon={faEye} className="mr-1" /> View
              </Link>
              <Link to={`/farmer/listings/edit/${listing.id}`} className="text-yellow-500 hover:underline">
                <FontAwesomeIcon icon={faEdit} className="mr-1" /> Edit
              </Link>
              <button
                onClick={() => console.log(`Toggle status for ${listing.id}`)}
                className={`focus:outline-none ${listing.status === 'active' ? 'text-gray-600 hover:text-red-500' : 'text-green-600 hover:text-green-700'}`}
              >
                <FontAwesomeIcon icon={listing.status === 'active' ? faToggleOn : faToggleOff} className="mr-1" />
                {listing.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
              <button
                onClick={() => console.log(`Mark as sold for ${listing.id}`)}
                className="text-green-600 hover:text-green-700 focus:outline-none"
              >
                <FontAwesomeIcon icon={faCheckCircle} className="mr-1" /> Sold
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyCropListings;