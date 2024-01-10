//Import function to import MongoDB Collection

//Function to retrieve all vendor details

const { getCollectionFromMongoDB} = require('../utils/mongoDBConnection');

async function getVendorsDataFromMongoDB() {
    try {
      const allVendorRecordsFromMongoDB = await getCollectionFromMongoDB("vendors");
      const arrayOfVendorData = await allVendorRecordsFromMongoDB.find({}).toArray();
      return arrayOfVendorData; // return array of vendor data
    }catch (err) {
      console.error("Error fetching vendors data:", err);
      throw err;
    }
  }

  module.exports = {
    getVendorsDataFromMongoDB
  };