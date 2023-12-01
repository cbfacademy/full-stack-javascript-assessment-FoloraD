import React from "react";
import '../styles/StoreListComponent.css'

const StoreListComponent = ({ vendors }) => {
  return (
    <div className="store-list">
      <h2>Plantain Stores Near Me </h2>
      <ul>
        {vendors.map((vendor) => (
          <li key={vendor.id} className="store-item"> 
            <h3>{vendor.name}</h3>
            <p> Location: {vendor.location}</p>
            <p>Postcode: {vendor.postcode}</p>
            <p> Plantain Price: £{vendor.plantainPriceGBP}</p>
            <button className="vendor-more-details-button"> More Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreListComponent;
