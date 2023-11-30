import { useState } from "react"; //manage state within components
import React from 'react';
import axios from 'axios';
import StoreListComponent from "./StoreListComponent";

//const [stateVariable, setStateFunction] = useState(initialValue)
//state = data within a component that change in response to user actions or other events

const SearchComponent = () => {

    //postcode =>user input, setPostcode =>updates the state of postcode variable
    const [postcode, setPostcode] = useState('');
    //vendors =>holds retrieved data from API endpoint, setVendors =>update the state of vendors variable
    const [vendors, setVendors] = useState([]);
    //error => error message when an error occurs during API request/data retrieval
    //setError => update the state of error variable
    const [error, setError]= useState('');

    const handleUserPostcodeSearch = async () => {
        const cleanedPostcode = postcode.trim().toUpperCase();

        try {
            const response = await axios.get(`http://localhost:5000/searchByPostcode?postcode=${cleanedPostcode}`);
            //successful request => update 'vendors' state
            setVendors(response.data.vendors || []);
            setError('');
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong')
            setVendors([])
        }
    }
    return( 
    <div>
        <input 
        type="text" 
        placeholder='Search postcode...'
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
        />
        
        <button onClick={handleUserPostcodeSearch}>Search</button>
        {vendors.length > 0 && <StoreListComponent vendors={{vendors}} /> }
        {vendors.length === 0 && !error && <p> No vendors found</p>}
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