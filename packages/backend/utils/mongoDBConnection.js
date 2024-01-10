const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI; // Add your connection string from Atlas to your .env file. See https://docs.atlas.mongodb.com/getting-started/
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db("plantain_app_db");
    //const collection = database.collection("vendors");
   // const result = await collection.findOne();

   // console.log("Test query result:", result);
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    throw err;
  }
}

 // function to GET a collection from the database
 async function getCollectionFromMongoDB(collectionName) {
  try {
  //return client.db().collection(collectionName);
  const plantainAppDatabase = await connectToDatabase();
  return plantainAppDatabase.collection(collectionName);
  } catch (err){
    console.error("Error getting collection:", err);
    throw err;

  }
 
}

module.exports = { getCollectionFromMongoDB };