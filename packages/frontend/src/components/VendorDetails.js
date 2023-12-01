import React from 'react';
import '../styles/VendorDetails.css'

//extract vendor details and display
const VendorDetails = () => {
    return (
        <div>
            <h2> Vendor Details{vendor.name}</h2>
            <p>Location: {vendors.location} </p>
            <p> Postcode: {vendors.postcode}</p>
            <p> Plantain Price £{vendors.plantainPriceGBP}</p>
            {/*Additional vendor details */}
        </div>
    );
};

export default VendorDetails;