// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const port = 8000;

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.listen(port, () =>
  console.log(`The server is up and running on port: ${port}`)
);

// Initialize allData route
app.get("/allData", (req, res) => {
  projectData && res.send(projectData);
});

// Post Route
app.post("/post", (req, res) => {
  const info = await req.body;
  projectData = info;
  res.send(projectData);
});
