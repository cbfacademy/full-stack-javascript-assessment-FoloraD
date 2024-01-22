const axios = require("axios");

async function geocodePostcode(postcode) {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const geocodingEndpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${apiKey}`

    try {
        console.log("Geocoding Endpoint:", geocodingEndpoint);
        const response = await axios.get(geocodingEndpoint);
        const geocodingData = response.data;

        console.log("Geocoding Data:", geocodingData)

        if (geocodingData.status !== 'OK'){
            throw new Error('Geocoding failed ');
        }
        return geocodingData.results[0].geometry.location;
        
    } catch (error) {
        throw new Error('Error in geocoding request: ' + error.message)
    }
}

module.exports = {
    geocodePostcode,
};
