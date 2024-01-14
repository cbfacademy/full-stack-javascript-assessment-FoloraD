import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/VendorDetails.css'
import { useParams } from 'react-router-dom'; //hook used to access the `id` from the URL

//State to hold vendor details & handeling errors
//Function to fetch vendor details based on ID (use axios http://localhost:5000/vendors)

//extract vendor details and display
const VendorDetails = () => {

    const { id } = useParams(); // access route parameter 'id'
    //vendor holds the current value
    //set to null(absence of value) because data fetching hasn't started yet
    //setVendor will update vendor with successfully fetched data
    const [vendor, setVendors] = useState(null);
    const [error, setError] = useState('');

    useEffect(() =>{
        const fetchVendorDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/${id}`);
                console.log(response);
                setVendors(response.data);
                setError('');
            } catch (err) {
                setError(err.response?.data?.error || 'Something went wrong');
            }
        };

        fetchVendorDetails();

    }, [id]); // id as a dependency for useEffect
    return (
        <div>
            <h2> Vendor Details</h2>
        {error && <p className='error-message'>{error}</p>} {/*if error is true render the message in the `error` state variable */}
           {vendor && (
            <div>
            <h3>{vendor.name}</h3>
            <p>Location: {vendor.location} </p>
            <p> Postcode: {vendor.postcode}</p>
            <p> Plantain Price £{vendor.plantainPriceGBP}</p>
             {/*TODO: add Additional vendor details */}
            {/*condition to check vendor has a value. if `true` render the details*/}
            </div>
      
           )}

           
        </div>
    );
};

export default VendorDetails;

//displays info about a specific vendor