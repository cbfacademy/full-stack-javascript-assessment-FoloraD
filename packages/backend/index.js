const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
//const {getCollectionFromMongoDB} = require("./utils/mongoDBConnection")
const vendorRoutes = require("./routes/vendorRoutes");

require("dotenv").config();
const app = express();

//global middleware
app.use(helmet());
//CORS global setup to allow requests from localhost:3000(frontend)
//it applies CORS middleware to all routes in express.js
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET", //allowed methods
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

//empty route aka endpoint
// app.get("/", (req, res) => {
//   res.send("Hello from the CBF Academy backend!");
// });

//define routes
app.use("/vendors", vendorRoutes);

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
