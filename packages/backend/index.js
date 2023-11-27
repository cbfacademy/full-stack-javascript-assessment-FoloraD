const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

//mocked vendor data
const mockedVendors = require('./mockData/mockedVendors')
require("dotenv").config();
const app = express();

app.use(helmet());
app.use(cors());
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
  res.send("This should return name of vendor, vendor location and plantain price");
});

//request to access the mocked vendor data
app.get("/vendors", (req, res) => {
  res.json(mockedVendors);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
