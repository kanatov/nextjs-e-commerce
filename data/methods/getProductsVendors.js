const products = require("../products.js");

function getProductsVendors(req, res) {
  console.log("GET /products/vendors");
  const vendorsSet = new Set();
  products.forEach((product) => vendorsSet.add(product.vendor));
  res.json({ vendors: [...vendorsSet] });
}

module.exports = getProductsVendors;
