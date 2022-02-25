// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const port = 8080;

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.listen(port, () =>
  console.log("The server is up and running on port: ${port}")
);

// Initialize all route
app.get("/all", (_req, res) => res.send(projectData));

// Post Route
app.post("/post", (_req, res) => {
  projectData = {
    temperature: request.body.temperature,
    date: request.body.date,
    content: request.body.content,
  };
  res.send(projectData);
});
