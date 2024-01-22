import React from 'react';
import '../styles/MapDisplay.css'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const MapDisplay = () => {

    const  { isLoaded } = useJsApiLoader ({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const containerStyle = {
        height: '400px',
        width: '100%',
    };

    const center = {
        lat: 51.509865,
        lng: -0.118092,
    };

    return (
        <div className='map-container'>
            {isLoaded ? (
                <GoogleMap 
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                >
                    
                </GoogleMap>

            ) : (
                <p className='loading-text'>Map loading..</p>
            )}
            
        </div>
    );
  };

export default MapDisplay;