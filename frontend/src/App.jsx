import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Components/Landing';
import SignIn from './Components/SignIn';
import FarmerRegistrationForm from './Components/FarmerRegistrationForm';
import BuyerRegistrationForm from './Components/BuyerRegistrationForm';
import BuyerHomePage from './Components/BuyerHomePage';
import FarmerHomePage from './Components/FarmerHomePage';
import UploadCropForm from './Components/UploadCropForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FarmerHomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register/farmer" element={<FarmerRegistrationForm />} />
        <Route path="/register/buyer" element={<BuyerRegistrationForm />} />
        <Route path="/BuyerHomePage" element={<BuyerHomePage />} /> {/* Route for BuyerHomePage */}
        <Route path="/FarmerHomePage" element={<FarmerHomePage />} /> {/* Route for FarmerHomePage */}
        <Route path="/farmer/upload-crop" element={<UploadCropForm />} /> {/* Example route */}
        {/* Add other routes here as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;