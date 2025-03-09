import { env } from "@/lib/config";

// Prepare products URI
export function prepareURI({ page = 1, tags = [] } = {}) {
  let uri = env.api;

  // In real project we would have cap limit on server side
  // as it's not secure to give exposed API to fetch all the data
  uri += `/products?_limit=${limit}`;
  if (page !== 1) {
    uri += `&_page=${page}`;
  }
  // Json-server handles case-insensitive search by default
  // In real project I would have to take care of that
  if (typeof tags === "string" && tags.length) {
    uri += `&tags_like=${tags}`;
  }
  if (Array.isArray(tags)) {
    tags.forEach((tag) => {
      uri += `&tags_like=${tag}`;
    });
  }
  return uri;
}

// Get all products matching the filters
export async function getProducts({ page = 1, tags = [] } = {}) {
  // Validate the input
  if (typeof page !== "number" || page < 1) {
    throw new Error("Invalid page number");
  }
  if (!Array.isArray(tags) && typeof tags !== "string") {
    throw new Error("Invalid tags");
  }

  const uri = prepareURI({ page, tags });
  // Adding pagination information
  // It's a common pattern to return pagination information
  // such as total number of items, current page, total pages, etc.
  // unfortunately json-server doesn't provide that information in this version

  // Fetch the data
  console.info("> Trying to get products from:", uri);
  try {
    const data = await fetch(uri);
    const products = await data.json();
    const paginatedProducts = {
      count: total,
      page,
      pages,
      previous: page > 1,
      next: page < pages,
      products,
    };
    console.info("> Received products:", paginatedProducts);
    return paginatedProducts;
  } catch (error) {
    console.error("Can't fetch products");
    throw new Error(error);
  }
}

// Get all tags
export async function getAllTags() {
  try {
    // Adding "tags" to the data.json as the idea of retrieving
    // all the products just to get the tags doesn't feels right to me.
    const data = await fetch(`${env.api}/products/tags`);
    const tagsData = await data.json();
    const tags = tagsData?.tags.length ? tagsData.tags : [];

    // Let's sort them alphabetically.
    // Json-server can do that, but I don't think server should do that.
    return tags.sort();
  } catch (error) {
    console.error("Can't fetch products tags");
    throw new Error(error);
  }
}
