const products = require("../products.js");

function getProductsTags(req, res) {
  // console.info("GET /products/tags");
  const tagsSet = new Set();
  products.forEach((product) => {
    product.tags.forEach((tag) => tagsSet.add(tag));
  });
  res.json({ tags: [...tagsSet] });
}

module.exports = getProductsTags;
