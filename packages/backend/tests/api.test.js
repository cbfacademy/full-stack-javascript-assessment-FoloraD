// insert the required stuff
const request = require('supertest');
const express = require('express');

//Create an Express app instance
const app = express();

//Import the mock vendor data
const mockedVendors = require('../mockData/mockedVendors');

//Route to access the mocked vendor data
app.get("/vendors", (req, res) => { 
    res.json(mockedVendors);
});

//Route to search vendors by postcode
app.get('/searchByPostcode', (req, res) => {
    const { postcode } = req.query;
    const filteredVendors = mockedVendors.filter(vendor => vendor.postcode === postcode);
    res.json({vendors: filteredVendors});
});

//describe block for get all vendors from mock data
describe('GET /vendors', () => {
    it('responds with JSON containing mocked vendor data', async () => {
        const response = await request(app).get('/vendors');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockedVendors);
    });
});

//Describe block for searchByPostcode endpoint
describe('GET /searchByPostcode', () => {
    it('responds with vendors for a valid postcode', async () => {
    const response = await request(app).get('/searchByPostcode').query({postcode: 'SW11AA'});
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        vendors: [
             {
                    id: 1,
                    name : 'Vendor A',
                    location: 'London',
                    postcode: 'SW11AA',
                    plantainPriceGBP: 2.5,
                },
            ],
        });
    });
});

//To do
//respond with 400 for invalid postcode
