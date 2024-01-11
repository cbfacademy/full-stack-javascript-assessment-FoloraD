// insert the required stuff
const axios = require("axios");

//Create an Express app instance defined in 'index.js'
const app = require("../index");

//Import dependencies to connect to MongoDB
const { MongoClient } = require("mongodb");
const { getCollectionFromMongoDB } = require("../utils/mongoDBConnection");
//const PORT = 5001;

//Describe block for searchByPostcode endpoint
describe("GET /searchByPostcode endpoint", () => {
  it("responds with vendors for a valid postcode", async () => {
    const validPostcode = "SW11AA";
    console.log('Valid postcode:', validPostcode);
    const response = await axios.get(
        `http://localhost:5000/searchByPostcode?postcode=${validPostcode}`
    );
    expect(response.status).toBe(200);
    expect(response.data[0]).toEqual({
      _id: expect.any(String),
      name: expect.any(String),
      location: expect.any(String),
      postcode: expect.any(String),
      plantainPriceGBP: expect.any(Number),
    });
  });
});
