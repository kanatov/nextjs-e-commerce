const products = require("../products.js");

function getProductsVendors(req, res) {
  // console.info("GET /products/vendors");
  const vendorsSet = new Set();
  products.forEach((product) => vendorsSet.add(product.vendor));
  res.json({ vendors: [...vendorsSet] });
}

module.exports = getProductsVendors;
