import { env } from "@/lib/config";

// Get all products matching the filters
export async function getProducts({ page = 1, tags = [] } = {}) {
  // Validate the input
  if (typeof page !== "number" || page < 1) {
    throw new Error("Invalid page number");
  }
  if (!Array.isArray(tags) && typeof tags !== "string") {
    throw new Error("Invalid tags");
  }

  const limit = env.itemsPerPage;

  // Prepare the URI
  // In real project we would have cap limit on server side
  // as it's not secure to give exposed API to fetch all the data
  let uri = `${env["data-api"]}/products?_per_page=${limit}`;
  if (page !== 1) {
    uri = `${uri}&_page=${page}`;
  }
  // Json-server handles case-insensitive search by default
  // In real project I would have to take care of that
  if (typeof tags === "string" && tags.length) {
    uri = `${uri}&tags_like=${tags}`;
  }
  if (Array.isArray(tags)) {
    tags.forEach((tag) => {
      uri = `${uri}&tags_like=${tag}`;
    });
  }

  // Fetch the data
  try {
    console.info("> Fetching products from:", uri);
    const data = await fetch(uri);
    const products = await data.json();
    return products;
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
    const data = await fetch(`${env["data-api"]}/tags`);
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
