import { env } from "@/lib/config";
import { getUrlFromParams } from "@/lib/helpers";

// Get all products matching the filters
export async function getProducts({
  path,
  page = 1,
  tags = [],
  vendor = "",
} = {}) {
  // Validate the input
  if (typeof page !== "number" || page < 1) {
    throw new Error("Invalid page number");
  }
  if (!Array.isArray(tags) && typeof tags !== "string") {
    throw new Error("Invalid tags");
  }

  const uri = `${env.api}${path}${getUrlFromParams({ page, tags, vendor })}`;
  // Adding pagination information
  // It's a common pattern to return pagination information
  // such as total number of items, current page, total pages, etc.
  // unfortunately json-server doesn't provide that information in this version

  // Fetch the data
  console.info("> Trying to get products from:", uri);
  try {
    const data = await fetch(uri);
    const products = await data.json();
    console.info("> Received products:", products);
    return products;
  } catch (error) {
    console.error("Can't fetch products");
    throw new Error(error);
  }
}

// Get all tags
export async function getAllTags() {
  try {
    const data = await fetch(`${env.api}/products/tags`);
    const tagsData = await data.json();
    const tags = tagsData?.tags.length ? tagsData.tags : [];

    // Let's sort them alphabetically.
    // Endpoint can do that, but I don't think server should do that.
    return tags.sort();
  } catch (error) {
    console.error("Can't fetch products tags");
    throw new Error(error);
  }
}
// Get all vendors
export async function getAllVendors() {
  try {
    const data = await fetch(`${env.api}/products/vendors`);
    const vendorsData = await data.json();
    const vendors = vendorsData?.vendors.length ? vendorsData.vendors : [];

    // Let's sort them alphabetically.
    // Endpoint can do that, but I don't think server should do that.
    return vendors.sort();
  } catch (error) {
    console.error("Can't fetch products vendors");
    throw new Error(error);
  }
}
