import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function UploadCropForm() {
  const navigate = useNavigate();
  const [cropName, setCropName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      setPreviewUrl(URL.createObjectURL(selectedImage));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploading(true);
    setUploadError('');

    // Simulate an upload process (replace with your actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (Math.random() < 0.8) {
      console.log('Crop details submitted:', { cropName, quantity, unit, pricePerUnit, description, image });
      setUploading(false);
      navigate('/farmer/crop-listings'); // Redirect after successful upload
    } else {
      setUploading(false);
      setUploadError('Failed to upload crop. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"> {/* Removed overflow-y-auto and max-h */}
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-green-700 text-center mb-6">
                <FontAwesomeIcon icon={faCloudUpload} className="mr-2" />
                Upload Your Crop
              </h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-green-300 focus:border-green-500"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="unit" className="block text-gray-700 text-sm font-bold mb-2">
                    Unit
                  </label>
                  <select
                    id="unit"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-green-300 focus:border-green-500"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  >
                    <option value="kg">kg</option>
                    <option value="quintal">Quintal</option>
                    <option value="ton">Ton</option>
                    <option value="lbs">Lbs</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="pricePerUnit" className="block text-gray-700 text-sm font-bold mb-2">
                  Price per {unit}
                </label>
                <input
                  type="number"
                  id="pricePerUnit"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-green-300 focus:border-green-500"
                  placeholder="Enter price"
                  value={pricePerUnit}
                  onChange={(e) => setPricePerUnit(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  rows="3"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-green-300 focus:border-green-500"
                  placeholder="Add a brief description of your crop"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                  Upload Image (Optional)
                </label>
                <input
                  type="file"
                  id="image"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-green-300 focus:border-green-500"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                {previewUrl && (
                  <div className="relative mt-2">
                    <img src={previewUrl} alt="Crop Preview" className="rounded-md max-h-48 w-auto" />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      <FontAwesomeIcon icon={faTimesCircle} size="sm" />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-300"
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Upload Crop'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/farmer/dashboard')}
                  className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800"
                >
                  Cancel
                </button>
              </div>
              {uploadError && <p className="text-red-500 text-sm italic">{uploadError}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadCropForm;