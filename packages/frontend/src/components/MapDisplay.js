import React, { useEffect } from "react";
import "../styles/MapDisplay.css";
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { PropTypes } from "prop-types";
import redDotImage from "../images/red-dot.png";
import { Loader } from "@googlemaps/js-api-loader";

const MapDisplay = ({ vendors }) => {
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      version: "weekly",
    });

    loader
      .importLibrary("maps")
      .then(({ Map }) => {
        const map = new Map(document.getElementById("map"), {
          center:
            vendors.length > 0
              ? {
                  lat: vendors[0].coordinates.latitude,
                  lng: vendors[0].coordinates.longitude,
                }
              : { lat: 0, lng: 0 },
          zoom: 15,
        });

        vendors.forEach((vendor) => {
          new window.google.maps.Marker({
            position: {
              lat: vendor.coordinates.latitude,
              lng: vendor.coordinates.longitude,
            },
            map,
            title: vendor.name,
            icon: {
              url: redDotImage,
              scaledSize: new window.google.maps.Size(40, 40),
            },
          });
        });
      })
      .catch((error) => {
        console.error("Error loading Maps library:", error);
      });
  }, [vendors]);

  return <div id="map" style={{ height: "400px", width: "100%" }} />;
};

//     // const  { isLoaded } = useJsApiLoader ({
//     //     id: 'google-map-script',
//     //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//     // });

//     const containerStyle = {
//         height: '400px',
//         width: '100%',
//     };

//     // const center = {
//     //     lat: 51.509865,
//     //     lng: -0.118092,
//     // };

//     return (
//         <div className='map-container'>
//             {isLoaded ? (
//                 <GoogleMap
//                 mapContainerStyle={containerStyle}
//                 center={vendors.length > 0 ? { lat: vendors[0].coordinates.latitude, lng: vendors[0].coordinates.longitude }: { lat: 0, lng: 0 }}
//                 zoom={15}
//                 >
//                     {vendors.map((vendor) => (
//                         <Marker
//                             key={vendor._id}
//                             position={{ lat: vendor.coordinates.latitude, lng: vendor.coordinates.longitude }}
//                             title={vendor.name}
//                             icon={{
//                                 url: redDotImage,
//                                 scaledSize: new window.google.maps.Size(40, 40), // Adjust the size if needed
//                             }}
//                         //     icon={{
//                         //         url: 'path/to/your/red-marker.png', // Use a red marker icon
//                         //         scaledSize: new google.maps.Size(40, 40), // Adjust size as needed
//                         //     }}
//                          />

//                    ))}
//                 </GoogleMap>

//             ) : (
//                 <p className='loading-text'>Map loading..</p>
//             )}

//         </div>
//     );
//   };

MapDisplay.propTypes = {
  vendors: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      coordinates: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
      }).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MapDisplay;
