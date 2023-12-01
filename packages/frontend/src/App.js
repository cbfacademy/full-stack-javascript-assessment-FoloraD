import React from "react";
import VendorDetails from "./components/VendorDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchComponent from "./components/SearchComponent";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchComponent/> }/>
        <Route path="/vendor/:id" element={<VendorDetails />}/>
        </Routes>
    </Router>

  );
}

export default App;
