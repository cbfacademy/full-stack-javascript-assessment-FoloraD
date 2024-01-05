const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb"); //TO do remove
const mongoDBConnection = require("./utils/dbConnection")

//mocked vendor data
//const mockedVendors = require('./mockData/mockedVendors') //TO do remove
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

mongoDBConnection.connectToDB().catch(console.dir);
 
//TO do remove below DB connection
/* 
// connecting to the DB.
const uri = process.env.MONGO_URI; // Add your connection string from Atlas to your .env file. See https://docs.atlas.mongodb.com/getting-started/
const client = new MongoClient(uri, { //create new MongoDB client
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//attempt to establish connection to MongoDB server
// client.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MongoDB", err);
//     return;
//   }
//   console.log("Connected to MongoDB");
//   client.close();
// });

//Connecting with MongoDB Driver
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

*/

//empty route aka endpoint
app.get("/", (req, res) => {
 res.send("Hello from the CBF Academy backend!");
});

//Defining Routes
//ENDPOINT: Search postcode endpoint
//curl "http://localhost:5000/searchByPostcode?postcode=SW11AA"
/* REMOVE
app.get("/searchByPostcode", (req, res) => {
 // extract 'postcode' from query parameters
 const { postcode } = req.query;
  
 //check if postcode is provided. Bad request 400 & error message
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
*/

app.get("/searchByPostcode", async(req, res) => {
  const { postcode }= req.query;

  if (!postcode) {
    return res.status(400).json({error: "Postcode is required."});
  }
//Database interaction
  const vendorCollection = mongoDBConnection.getCollection("vendors");

  try {
    const listOfRetrievedVendors = await vendorCollection.find({ postcode }).toArray();

    if (listOfRetrievedVendors.length === 0) {
      return res.status(404).json({ error: "No vendors for this postcode." });
    }

    res.status(200).json({ listOfRetrievedVendors});
  } catch (err) {
    console.error("Error fetching vendors:", err);
    res.status(500).json({error: "Server error"} )
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
