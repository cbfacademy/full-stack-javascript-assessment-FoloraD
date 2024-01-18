const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const http = require('http');
const WebSocket = require('ws')
//const {getCollectionFromMongoDB} = require("./utils/mongoDBConnection")
const vendorRoutes = require("./routes/vendorRoutes");

require("dotenv").config();
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server })

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received: ${message}`)
  });
  ws.send('Hello, WebSocket client!');
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

//global middleware
app.use(helmet());
//CORS global setup to allow requests from localhost:3000(frontend)
//it applies CORS middleware to all routes in express.js
app.use(cors());

app.use(express.json());

//empty route aka endpoint
// app.get("/", (req, res) => {
//   res.send("Hello from the CBF Academy backend!");
// });

//define routes
app.use("/", vendorRoutes);

//start server
if (require.main === module) {
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
}

module.exports = app;