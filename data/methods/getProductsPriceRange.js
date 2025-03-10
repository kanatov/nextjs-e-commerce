const products = require("../products.js");

function getProductsPriceRange(req, res) {
  // console.info("GET /products/price-range");
  let min = Infinity,
    max = 0;
  products.forEach((product) => {
    min = Math.min(min, product.price);
    max = Math.max(max, product.price);
  });
  res.json({ min, max });
}

module.exports = getProductsPriceRange;
