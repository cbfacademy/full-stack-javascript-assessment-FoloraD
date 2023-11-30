const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

//mocked vendor data
const mockedVendors = require('./mockData/mockedVendors')
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

// connecting to the DB.
// const uri = process.env.MONGO_URI; // Add your connection string from Atlas to your .env file. See https://docs.atlas.mongodb.com/getting-started/
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// client.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MongoDB", err);
//     return;
//   }
//   console.log("Connected to MongoDB");
//   client.close();
// });
//empty route aka endpoint
app.get("/", (req, res) => {
 res.send("Hello from the CBF Academy backend!");
});


//Search postcode endpoint
app.get("/searchByPostcode", (req, res) => {
 // extract 'postcode' from query parameters
 const { postcode } = req.query;
  
 //check if postcode is provided. Bad request 400 & error message
 //curl "http://localhost:5000/searchByPostcode?postcode=SW11AA"
  if(!postcode){
    return res.status(400).json({error: "Postcode is required."})
  }
  
  //search for vendors matching the postcode
  const filteredVendors = mockedVendors.filter(
    (vendor) => vendor.postcode === postcode
  );
  //check if any vendors are found
  if(filteredVendors.length === 0) {
    return res.status(404).json({ error: "No vendors for this postcode." });
  }

  //send data of filtered vendors
  const vendorsData = filteredVendors.map(({id, name, location, postcode, plantainPriceGBP}) => ({
    id,
    name,
    location,
    postcode,
    plantainPriceGBP,
  }));

  res.status(200).json({ vendors: vendorsData });
});

//request to access the mocked vendor data 
//curl http://localhost:5000/vendors
app.get("/vendors", (req, res) => {
  res.json(mockedVendors);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
