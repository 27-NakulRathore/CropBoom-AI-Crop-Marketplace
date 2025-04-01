import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Components/Landing';
import SignIn from './Components/SignIn';
import FarmerRegistrationForm from './Components/FarmerRegistrationForm';
import BuyerRegistrationForm from './Components/BuyerRegistrationForm';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register/farmer" element={<FarmerRegistrationForm />} />
        <Route path="/register/buyer" element={<BuyerRegistrationForm />} />
        {/* ... other routes ... */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
