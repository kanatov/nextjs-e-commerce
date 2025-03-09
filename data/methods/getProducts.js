const products = require("../products.js");
const CAP = parseInt(process.env.CAP || 12);

function getProducts(req, res) {
  let { page, tags } = req.query;
  console.log("GET /products", { page, tags });

  const currentPage = parseInt(page) || 1;
  let filteredProducts = products;
  if (tags) {
    const tagsArray = Array.isArray(tags) ? tags : [tags];
    filteredProducts = products.filter((product) =>
      product.tags.some((t) => tagsArray.includes(t))
    );
  }

  const startIndex = (currentPage - 1) * CAP;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + CAP
  );

  const pages = Math.ceil(filteredProducts.length / CAP);

  const next = currentPage < pages;
  const previous = currentPage > 1;

  res.json({
    totalCount: filteredProducts.length,
    page: currentPage,
    pages,
    previous,
    next,
    perPage: CAP,
    products: paginatedProducts,
  });
}

module.exports = getProducts;
