const { getVendorsDataFromMongoDB } = require("../models/vendorModel");

 async function searchVendorsByPostcode (req, res) {
    const { postcode } = req.query;
    console.log("Postcode:", postcode)
  //TO DO: create fucntion to check postcode is valid
    if (!postcode) {
      return res.status(400).json({ error: "Postcode is required." });
    }
    //Database interaction
    try {
      const fetchedVendorRecords = await getVendorsDataFromMongoDB();
      console.log("Retrieved vendors:", fetchedVendorRecords)
  
      //Filter data by postcode
      const filteredVendorsByPostcode = fetchedVendorRecords.filter(vendor => vendor.postcode === postcode);
      if (filteredVendorsByPostcode.length === 0) {
        return res.status(404).json({message: "No vendors found for this postcode"})
       }
     
      res.json(filteredVendorsByPostcode);
  
      console.log("filtered Vendors:", filteredVendorsByPostcode)
    } catch (err) {
      console.error("Error searching vendors by postcode:", err);
      res.status(500).json({error: "Internal server error"});
    }
  
  };

  //ENDPOINT to retrieve a specific vendor by ID
//curl http://localhost:5000/vendors
function getVendorByID(req, res){
    const { id } = req.params //extract ID from request
  
    // Find vendor with matching ID
    const findVendorByID = mockedVendors.find(vendor => vendor.id === parseInt(id));
  
    if (findVendorByID) {
      res.json(findVendorByID); //return vendor detail if found
    } else {
      res.status(404).json({ error: 'Vendor not found'});
    }
    
  };

  module.exports = {
    searchVendorsByPostcode,
    getVendorByID
  };