const express = require("express");
const cors = require("cors");
const getProductsTags = require("./methods/getProductsTags");
const getProducts = require("./methods/getProducts");
const app = express();
app.use(cors());

require("dotenv").config();
const SERVER_PORT = parseInt(process.env.SERVER_PORT || 3010);
const CAP = parseInt(process.env.CAP || 12);

console.log("Configured SERVER_PORT:", SERVER_PORT);
console.log("Configured CAP:", CAP);

// Properly handling all the necessary logic without pain, yay!
// Get products
app.get("/products/tags", (req, res) => {
  getProductsTags(req, res);
});
app.get("/products", (req, res) => {
  getProducts(req, res);
});

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server running at http://localhost:${SERVER_PORT}`);
});
