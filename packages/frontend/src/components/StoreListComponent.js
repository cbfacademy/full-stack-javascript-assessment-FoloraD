import React from "react";
import '../styles/StoreListComponent.css'
import { Link } from 'react-router-dom';
import  PropTypes from "prop-types";

const StoreListComponent = ({ vendors }) => {
  return (
    <div className="store-list">
      <h2>Plantain Stores Near Me </h2>
      <h2>A list view of plantain vendors with essential info </h2>
      <ul>
        {vendors.map((vendor) => (
          <li key={vendor.id} className="store-item"> 
            <h3>{vendor.name}</h3>
            <p> Location: {vendor.location}</p>
            <p>Postcode: {vendor.postcode}</p>
            <p> Plantain Price: £{vendor.plantainPriceGBP}</p>
            <Link to={`/${vendor.id}`}> 
            <button className="vendor-more-details-button"> Store details</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

StoreListComponent.propTypes = {
  vendors: PropTypes.array.isRequired,
};
export default StoreListComponent;
