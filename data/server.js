const express = require("express");
const cors = require("cors");
const getProductsTags = require("./methods/getProductsTags");
const getProducts = require("./methods/getProducts");
const getProductsVendors = require("./methods/getProductsVendors");
const getProductsPriceRange = require("./methods/getProductsPriceRange");
const app = express();
app.use(cors());

require("dotenv").config();
const SERVER_PORT = parseInt(process.env.SERVER_PORT || 3010);
const CAP = parseInt(process.env.CAP || 12);

console.log("Configured SERVER_PORT:", SERVER_PORT);
console.log("Configured CAP:", CAP);

// Properly handling all the necessary logic without pain, yay!

// Get all products tags
app.get("/products/tags", (req, res) => {
  getProductsTags(req, res);
});

// Get all products vendors
app.get("/products/vendors", (req, res) => {
  getProductsVendors(req, res);
});

// Get all price range for all products
app.get("/products/price-range", (req, res) => {
  getProductsPriceRange(req, res);
});

// Get products by given filters
app.get("/products", (req, res) => {
  getProducts(req, res);
});

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server running at http://localhost:${SERVER_PORT}`);
});
