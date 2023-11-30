import React from "react";

const StoreListComponent = ({ vendors }) => {
  return (
    <div>
      <h2>Plantain Stores Near Me </h2>
      <ul>
        {vendors.map((vendor) => (
          <li key={vendor.id}> 
            <h3>{vendor.name}</h3>
            <p> Location: {vendor.location}</p>
            <p>Postcode: {vendor.postcode}</p>
            <p> Plantain Price: £{vendor.plantainPriceGBP}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreListComponent;
