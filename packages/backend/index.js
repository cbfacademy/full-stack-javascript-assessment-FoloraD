const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const {getCollection} = require("./utils/testConnection")

require("dotenv").config();
const app = express();

//global middleware
app.use(helmet());
//CORS global setup to allow requests from localhost:3000(frontend)
//it applies CORS middleware to all routes in express.js
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET', //allowed methods
  optionsSuccessStatus: 200
}));

app.use(express.json());

//empty route aka endpoint
app.get("/", (req, res) => {
 res.send("Hello from the CBF Academy backend!");
});

//Defining Routes
//ENDPOINT: Search postcode endpoint
//curl "http://localhost:5000/searchByPostcode?postcode=SW11AA"

// function to fetch data from vendors collection from database
async function getVendorsData() {
  try {
    const vendorCollection = await getCollection("vendors");
    const retrievedVendorData = await vendorCollection.find({}).toArray();
    return retrievedVendorData; // return array of vendor data
  }catch (err) {
    console.error("Error fetching vendors data:", err);
    throw err;
  }
}

app.get("/searchByPostcode", async (req, res) => {
  const { postcode } = req.query;
  console.log("Postcode:", postcode)

  if (!postcode) {
    return res.status(400).json({ error: "Postcode is required." });
  }
  //Database interaction
  try {
    
    const listOfRetrievedVendorData = await getVendorsData();
    console.log("Retrieved vendors:", listOfRetrievedVendorData)

    //Filter data by postcode
    const filteredVendorsByPostcode = listOfRetrievedVendorData.filter(vendor => vendor.postcode === postcode);
    res.json(filteredVendorsByPostcode);
    console.log("filtered Vendors:", filteredVendorsByPostcode)
  } catch (err) {
    console.error("Error searching vendors by postcode:", err);
    res.status(500).json({error: "Internal server error"});
  }
   
});

//ENDPOINT to retrieve a specific vendor by ID
//curl http://localhost:5000/vendors
app.get("/vendors/:id", (req, res) => {
  const { id } = req.params //extract ID from request

  // Find vendor with matching ID
  const findVendorByID = mockedVendors.find(vendor => vendor.id === parseInt(id));

  if (findVendorByID) {
    res.json(findVendorByID); //return vendor detail if found
  } else {
    res.status(404).json({ error: 'Vendor not found'});
  }
  
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
