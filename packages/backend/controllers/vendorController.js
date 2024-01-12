const { ObjectId } = require("mongodb");
const {
  getCollectionFromMongoDB,
  connectToDatabase,
} = require("../utils/mongoDBConnection");


//curl "http://localhost:5000/searchByPostcode?postcode=SW11AA"
async function searchVendorsByPostcode(req, res) {
  const { postcode } = req.query;
  console.log("Postcode:", postcode);
  //TO DO: create fucntion to check postcode is valid
  if (!postcode) {
    console.log("Empty Postcode");
    return res.status(400).json({ message: "Postcode is required." });
  }

  //Database interaction
  try {
    const collection = await getCollectionFromMongoDB("vendors");
    const fetchedVendorRecords = await collection.find({ postcode }).toArray();
    console.log("Vendor collection from MongoDB:", fetchedVendorRecords);

    //Filter data by postcode

    if (fetchedVendorRecords.length === 0) {
      return res
        .status(404)
        .json({ message: "No vendors found for this postcode" });
    }

    res.json(fetchedVendorRecords);

    console.log("filtered Vendors:", fetchedVendorRecords);
  } catch (err) {
    console.error("Error searching vendors by postcode:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

//ENDPOINT to retrieve a specific vendor by ID
//curl http://localhost:5000/vendors
async function getVendorByID(req, res) {
  const { id } = req.params; //extract ID from request

  try {
    const collection = await getCollectionFromMongoDB("vendors");
    const vendor = await collection.findOne({ _id: new ObjectId(id) });
console.log("Vendor found:", vendor)
    if (vendor) {
     return res.json(vendor);
    } 
      console.log("vendor not found")
      res.status(404).json({ error: "Vendor not  found" });
    
  } catch (err) {
    
    res.status(500).json({ error: "Internal server error" });
  }
}

//Endpoint to get all vendors
//curl http://localhost:5000/vendors
async function getAllVendors(req, res) {
  try {
    const collectionOfVendors = await getCollectionFromMongoDB("vendors");
    const allVendors = await collectionOfVendors.find({}).toArray();
    console.log("Result Vendors:", allVendors);
    res.json(allVendors);
    return
  } catch (err) {
    console.error("Error fetching all vendors:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  searchVendorsByPostcode,
  getVendorByID,
  getAllVendors,
};