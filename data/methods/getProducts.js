const products = require("../products.js");
const CAP = parseInt(process.env.CAP || 12);

function getProducts(req, res) {
  const page = parseInt(req.query?.page) || 1;
  const tags = req.query?.tags ? req.query.tags : [];
  const vendor = req.query?.vendor ? req.query.vendor : "";
  const tagsArray = Array.isArray(tags) ? tags : [tags];
  console.log("GET /products", { page, tagsArray, vendor });

  const filteredProducts = products.filter((product) => {
    if (tagsArray.length) {
      const containsTag = tagsArray.every((tag) => product.tags.includes(tag));
      if (!containsTag) return false;
    }
    if (vendor) return product.vendor === vendor;
    return true;
  });

  const startIndex = (page - 1) * CAP;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + CAP
  );

  const pages = Math.ceil(filteredProducts.length / CAP);

  const next = page < pages;
  const previous = page > 1;
  const response = {
    totalCount: filteredProducts.length,
    page,
    pages,
    previous,
    next,
    perPage: CAP,
    products: paginatedProducts,
  };
  console.log("GET /products", response);

  // Adding extra information to the response
  // It's a common pattern to return pagination information
  res.json(response);
}

module.exports = getProducts;
