import { useEffect, useState } from "react"; //manage state within components
import React from "react";
import axios from "axios";
import StoreListComponent from "./StoreListComponent";
import "../styles/LocationSearchComponent.css";
import MapDisplay from "./MapDisplay";
//const axios = require('axios');
//const [stateVariable, setStateFunction] = useState(initialValue)
//state = data within a component that change in response to user actions or other events

const SearchComponent = () => {
  //postcode =>user input, setPostcode =>updates the state of postcode variable
  const [postcode, setPostcode] = useState("");
  //vendors =>holds retrieved data from API endpoint, setVendors =>update the state of vendors variable
  const [vendors, setVendors] = useState([]);
  //error => error message when an error occurs during API request/data retrieval
  //setError => update the state of error variable
  const [error, setError] = useState("");


  const handleUserPostcodeSearch = async () => {
    const cleanedPostcode = postcode.trim().toUpperCase();

    try {
      const baseURL = process.env.REACT_APP_BACKEND_BASE_URL || "http://localhost:5000";
      const apiEndpoint = `/searchByPostcode?postcode=${cleanedPostcode}`;
      
      const response = await axios.get(
       `${baseURL}${apiEndpoint}`
      );
      //successful request => update 'vendors' state
      console.log(response.data);
      setVendors(response.data || []);
      setError("");

      //send cleanedPostcode to websocket server
      // const ws = new WebSocket("ws://100.26.28.197:3000/ws");
      // ws.onopen = () => {
      //   ws.send(cleanedPostcode);
      // };

      // ws.onmessage = (event) => {
        
      //   console.log("WebsSocket Data:", event.data);

      // };

      // ws.onclose = () => {
      //   console.log("WebSocket connection closed");
      // };
    } catch (err) {
      // if(err.response && err.response.data && err.response.data.error) {
      //   setError(err.response.data.error); //set error message from backend response
      // }else{
      //   setError("Something went wrong"); // fallback error message for other errors

      // }
      const errorMessage = err.response?.data?.message || "Something went wrong";
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
          <MapDisplay className="map-container" />
          {/*render MapDisplay component */}
        </div>
      )}
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
