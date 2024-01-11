import React from "react";
import VendorDetails from "./components/VendorDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LocationSearchComponent from "./components/LocationSearchComponent";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LocationSearchComponent/> }/>
        <Route path="/vendor/:id" element={<VendorDetails />}/>
        </Routes>
    </Router>

  );
}

export default App;
