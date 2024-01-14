const supertest = require("supertest");
const app = require("../index");
const apiRequest = supertest(app);

//Describe block for searchByPostcode endpoint
describe("GET /searchByPostcode endpoint - Valid Postcode", () => {
  it("responds with vendors for a valid postcode", async () => {
    const response = await apiRequest.get("/searchByPostcode?postcode=SW11AA");

 
    expect(response.status).toBe(200);
    expect(response.body[0]).toEqual({
      _id: expect.any(String),
      name: expect.any(String),
      location: expect.any(String),
      postcode: expect.any(String),
      plantainPriceGBP: expect.any(Number),
    });
  });

});
describe("GET /searchByPostcode endpoint - Invalid Postcode", () => {
  it("should respond with 400 for an empty postcode", async () => {
    const response = await apiRequest
      .get("/searchByPostcode?postcode=")
      .expect(400);

    expect(response.body).toEqual({
      message: "Postcode is required.",
    });
  });
});

//vendors
describe("GET /vendors/:id endpoint", () => {
  it("should respond with details of the specified vendor by ID", async () => {
    const response = await apiRequest
      .get("/657c8aaee47069592826311a")

   
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      _id: expect.any(String),
      name: expect.any(String),
      location: expect.any(String),
      postcode: expect.any(String),
      plantainPriceGBP: expect.any(Number),
    });
  });

  it.skip("should return 404 for non-existent vendor ID", async () => {
    const response = await apiRequest
    .get("/557c8aaee47069592826311x");

    console.log("Response Status:", response.status);
    console.log("Response Body:", response.body);  
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: "Vendor not found"
    });
  })
});

//it.only to run 1 test
//it.skip : skip specific test