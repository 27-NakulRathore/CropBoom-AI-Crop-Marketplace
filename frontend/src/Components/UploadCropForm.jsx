import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function UploadCropFormSimplified() {
  const [cropName, setCropName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);
  const location = useLocation();
  const email = location.state?.email;

  console.log("Received email:", email);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('cropName', cropName);
    formData.append('quantity', parseFloat(quantity));

    //formData.append('unit', unit);
    formData.append('address', address);
    formData.append('email', email);

    if (image) {
      formData.append('CropImage', image);
    }
    // Implement your upload logic here (API call, etc.)
    try {
      const response = await axios.post('http://localhost:8080/api/crops/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      alert(response.data); // Show server response
    } catch (error) {
      console.error('Error uploading crop:', error);
      alert('Upload failed');
    }
    console.log('Form Data:', Object.fromEntries(formData));
    //alert('Crop uploaded!'); // Placeholder for success message
  };

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center py-10">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">
          <FontAwesomeIcon icon={faCloudUpload} className="mr-2" />
          Upload Your Crop
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cropName" className="block text-gray-700 text-sm font-bold mb-2">
              Crop Name
            </label>
            <input
              type="text"
              id="cropName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-green-300 focus:border-green-500"
              placeholder="Enter crop name"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">
              Quantity
            </label>
            <div className="flex items-center">
              <input
                type="number"
                id="quantity"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-green-300 focus:border-green-500 mr-2"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
              <select
                id="unit"
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-green-300 focus:border-green-500"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value="kg">kg</option>
                <option value="quintal">Quintal</option>
                <option value="ton">Ton</option>
                {/* Add more units as needed */}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <textarea
              id="address"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-green-300 focus:border-green-500"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows="3" // Adjust number of rows as needed
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
              Upload Crop Image (Optional)
            </label>
            <input
              type="file"
              id="cropImage"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-green-300 focus:border-green-500"
              onChange={handleImageChange}
              accept="image/*" // Optional: Limit to image files
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Upload Crop
            </button>
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadCropFormSimplified;