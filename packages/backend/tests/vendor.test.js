const supertest = require("supertest");
const app = require("../index");
const apiRequest = supertest(app);

//Describe block for searchByPostcode endpoint
describe("GET /searchByPostcode endpoint - Valid Postcode" , () => {
  it("responds with vendors for a valid postcode", async () => {

    const response = await apiRequest
      .get("/searchByPostcode?postcode=SW11AA")
      

      console.log("Response Status:", response.status)
      console.log("Response Body:", response.data)
    expect(response.status).toBe(200);
    expect(response.body[0]).toEqual({
      _id: expect.any(String),
      name: expect.any(String),
      location: expect.any(String),
      postcode: expect.any(String),
      plantainPriceGBP: expect.any(Number),
    });
  });

// MOVE TEST TO client side
  // it("responds with 400 for invalid postcode", async () => {
    
  //   const response = await apiRequest
  //     .get("/searchByPostcode?postcode=W1234XY")
  //     .expect(400);

  // });


  });
