// insert the required stuff
const request = require('supertest');
const express = require('express');
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
    const response = await request(app).get('/searchByPostcode').query({postcode: 'SW1 1AA'});
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        vendors: [
             {
                    id: 1,
                    name : 'Vendor A',
                    location: 'london',
                    postcode: 'SW1 1AA',
                    plantainPriceGBP: 2.5,
                },
            ],
        });
    });
});