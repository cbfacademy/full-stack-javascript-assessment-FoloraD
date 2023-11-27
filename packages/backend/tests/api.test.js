// insert the required stuff
const request = require('supertest');
const express = require('express');
const app = express();

//Import the mock vendor data
const vendors = require('../mockData/mockedVendors');

//Route to access the mocked vendor data
app.get("/vendors", (req, res) => { 
    res.json(mockedVendors);

});

//describe block
describe('GET /vendors', () => {
    it('responds with JSON containing mocked vendor data', async () => {
        const response = await request(app).get('/vendors');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockedVendors);
    });
});