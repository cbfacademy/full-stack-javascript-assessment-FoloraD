import { useEffect, useState } from "react"; //manage state within components
import React from "react";
import axios from "axios";
import StoreListComponent from "./StoreListComponent";
import "../styles/LocationSearchComponent.css";
import MapDisplay from "./MapDisplay";
import Header from "./Header";
import Footer from "./Footer";

const SearchComponent = () => {
  const [postcode, setPostcode] = useState("");
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState("");

  const handleUserPostcodeSearch = async () => {
    const cleanedPostcode = postcode.trim().toUpperCase();

    try {
      const baseURL =
        process.env.REACT_APP_BACKEND_BASE_URL || "http://localhost:5000";
      //  console.log("Constructed URL:", `${baseURL}/searchByPostcode?postcode=${cleanedPostcode}`);

      const response = await axios.get(
        `${baseURL}/searchByPostcode?postcode=${cleanedPostcode}`
      );
      //successful request => update 'vendors' state
      // console.log(response.data);
      setVendors(response.data || []);
      setError("");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      setError(errorMessage);
      //reset vendors
      setVendors([]);
      console.log(err); // error object
      console.log(err.response);
    }
  };

  useEffect(() => {
    setVendors([]); //reset vendors when component is rendered
    setError(""); //reset error when component is rendered
  }, []);

  return (
    <div> 
      <Header />
       
    <div className="search-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Search postcode..."
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          className="postcode-input"
        />

        <button onClick={handleUserPostcodeSearch} className="search-button">
          Search
        </button>
      </div>

      {/*Display error message if error occurs*/}
      {error && <p className="error-message">{error}</p>}

      {/*conditionly render components when vendors are available */}
      {vendors.length > 0 && (
        <div className="search-results">
          <StoreListComponent vendors={vendors} />
          <MapDisplay vendors={vendors} className="map-container" />
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
};

export default SearchComponent;

// TODO
//import axios , useState
//function to clean user input to match expected. =>trim whitespace & convert to uppercase
//something to manage user input(state management) 'postcode' 'setPostcode'
//function to handle & manage the search action triggered by the user
//GET request to /searchByPostcode
//success update vendor state
//if error update vendor state & display error message
//update input field & button to reflect new functionality
