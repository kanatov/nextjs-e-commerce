const products = require("../products.js");
const CAP = parseInt(process.env.CAP || 12);

function getProducts(req, res) {
  const page = parseInt(req.query?.page) || 1;
  const tags = req.query?.tags ? req.query.tags : [];
  const tagsArray = Array.isArray(tags) ? tags : [tags];
  console.log("GET /products", { page, tagsArray });

  // Making a copy of the products array
  // To filter them to match all the tags
  let filteredProducts = [...products];
  if (tagsArray.length) {
    filteredProducts = products.filter((product) =>
      tagsArray.every((tag) => product.tags.includes(tag))
    );
  }

  const startIndex = (page - 1) * CAP;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + CAP
  );

  const pages = Math.ceil(filteredProducts.length / CAP);

  const next = page < pages;
  const previous = page > 1;

  // Adding extra information to the response
  // It's a common pattern to return pagination information
  res.json({
    totalCount: filteredProducts.length,
    page,
    pages,
    previous,
    next,
    perPage: CAP,
    products: paginatedProducts,
  });
}

module.exports = getProducts;
