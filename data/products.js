// Load product data
const fs = require("fs");
let products = [];
try {
  products = JSON.parse(
    fs.readFileSync(__dirname + "/products.json", "utf8")
  ).products;
} catch (error) {
  console.error("Error loading products:", error);
}
console.info("Loaded products:", products?.length);

module.exports = products;
