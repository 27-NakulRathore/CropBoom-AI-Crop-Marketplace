import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Components/Landing';
import SignIn from './Components/SignIn';
import FarmerRegistrationForm from './Components/FarmerRegistrationForm';
import BuyerRegistrationForm from './Components/BuyerRegistrationForm';
import BuyerHomePage from './Components/BuyerHomePage';
import FarmerHomePage from './Components/FarmerHomePage';
import UploadCropForm from './Components/UploadCropForm';
import MyCropListings from './Components/MyCropListings';
import BuyerCart from './Components/BuyerCart';
import BuyNowPage from './Components/BuyNowPage'; // Import BuyNowPage
import BuyerProfile from './Components/BuyerProfile'; // Adjust path if needed
import EditBuyerProfile from './Components/EditBuyerProfile'; // Adjust path if needed
import BuyerOrders from './Components/BuyerOrders';
import BookingsPage from './Components/BookingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FarmerHomePage/>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register/farmer" element={<FarmerRegistrationForm />} />
        <Route path="/register/buyer" element={<BuyerRegistrationForm />} />
        <Route path="/BuyerHomePage" element={<BuyerHomePage />} /> {/* Route for BuyerHomePage */}
        <Route path="/FarmerHomePage" element={<FarmerHomePage />} /> {/* Route for FarmerHomePage */}
        <Route path="/farmer/upload-crop" element={<UploadCropForm />} /> {/* Example route */}
        <Route path="/farmer/crop-listings" element={<MyCropListings/>} />
        <Route path="/buyer/cart" element={<BuyerCart />} />
        <Route path="/buyer/checkout" element={<BuyNowPage />} /> {/* mention route in app.jsx also */}
        <Route path="/buyer/profile" element={<BuyerProfile />} />
        <Route path="/buyer/profile/edit" element={<EditBuyerProfile />} />
        <Route path="/buyer/orders" element={<BuyerOrders />} /> {/* Route for BuyerOrders */}
        <Route path="/farmer/bookings" element={<BookingsPage />} /> {/* Route for BookingsPage */}
        {/* Add other routes here as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;