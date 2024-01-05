const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

// Setting up connection to the MongoDB.
const uri = process.env.MONGO_URI; // Add your connection string from Atlas to your .env file. See https://docs.atlas.mongodb.com/getting-started/
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//function to handle the process of connection to mongoDB server
async function connectToDB() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  connectToDB().catch(console.dir); // execute run function

  //function to GET a collection from the database
  function getCollection(collectionName) {
    return client.db().collection(collectionName);
  
  }

  module.exports = { connectToDB, getCollection };