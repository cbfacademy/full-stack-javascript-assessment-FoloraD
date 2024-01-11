// insert the required stuff
const axios = require('axios')

//Create an Express app instance defined in 'index.js'
const app = require('../index');


//Import dependencies to connect to MongoDB
const { MongoClient } = require('mongodb');
const { getCollectionFromMongoDB } = require('../utils/mongoDBConnection');


//TESTS
//describe block for get all vendors from database
describe('GET /vendors', () => {
    it('responds with JSON containing vendors from MongoDB', async () => {
        const collection = await getCollectionFromMongoDB('vendors');
        const expectedVendors = await collection.find({}).toArray();

        const response = await axios.get('http://localhost:5000/vendors');
        const data = response.data;
        expect(response.status).toBe(200);
        expect(data).toEqual(expectedVendors);
    });
});

//Describe block for searchByPostcode endpoint
// describe('GET /searchByPostcode endpoint test for SW11AA', () => {
//     it('responds with vendors for a valid postcode', async () => {
//     const response = await request(app).get('/searchByPostcode').query({postcode: 'SW11AA'});
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({
//       vendors: [
//         {
//           id: 1,
//           name: "Vendor A",
//           location: "London",
//           postcode: "SW11AA",
//           plantainPriceGBP: 2.5,
//         },
//         {
//           id: 4,
//           name: "Vendor A2",
//           location: "London",
//           postcode: "SW11AA",
//           plantainPriceGBP: 2.89,
//         },
//       ],
//     });
//     });
// });

//To do
//respond with 400 for invalid postcode
