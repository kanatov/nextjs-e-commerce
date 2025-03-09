// Generate URL from the parameters
export function getUrlFromParams({
  page = 1,
  tags = [],
  vendor = "",
  price = 0,
} = {}) {
  console.log("Making URL with:", { page, tags, vendor });
  const params = new URLSearchParams();

  // Pagination
  if (page !== 1) {
    params.set("page", page);
  }

  // One tag or multiple tags
  if (typeof tags === "string" && tags.length) {
    params.append("tags", tags);
  }
  if (Array.isArray(tags) && tags.length) {
    tags.forEach((tag) => params.append("tags", tag));
  }
  // Vendor
  if (vendor) {
    params.set("vendor", vendor);
  }

  // Price
  if (price) {
    params.set("price", price);
  }

  const newParams = params.toString();
  return newParams ? `?${newParams}` : "";
}

// Getting filters object from page params
export async function getFiltersFromParams(params) {
  const searchParams = await params.searchParams;
  const tags = searchParams?.tags || [];
  const price = searchParams?.price || 0;
  const filters = {
    page: searchParams?.page ? parseInt(searchParams.page, 10) : 1,
    tags: Array.isArray(tags) ? tags : [tags],
    price,
  };
  console.log("Filters from params:", filters);
  return filters;
}
