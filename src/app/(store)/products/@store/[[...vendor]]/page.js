import { notFound } from "next/navigation";
import { getProducts, getAllVendors } from "@/lib/data";
import Pagination from "@/components/Pagination";
import Card from "@/components/Card";
import { getFiltersFromParams } from "@/lib/helpers";
import NavLink from "@/components/NavLink";

export default async function Page(params) {
  const slug = await params.params;
  const vendors = await getAllVendors();

  if (
    slug?.vendor &&
    (slug?.vendor.length > 1 || !vendors.includes(slug.vendor[0]))
  ) {
    notFound();
  }
  const vendor = slug.vendor ? slug.vendor[0] : "";

  // Products and pagination
  const filters = await getFiltersFromParams(params);
  filters.path = "/products";
  filters.vendor = vendor;
  const paginatedProducts = await getProducts(filters);

  const state = {
    ...paginatedProducts,
    ...filters,
    vendor,
  };

  return (
    <section id="store" className="ml-40 w-full flex flex-col gap-4">
      <h2>
        {vendor && (
          <>
            <strong>Vendor: </strong>
            {vendor},{" "}
          </>
        )}
        {state.tags.length ? (
          <>
            <strong>Filtering by:</strong> {state.tags.join(", ")}
          </>
        ) : (
          <strong>All products</strong>
        )}
      </h2>
      <hr className="opacity-45" />
      {state.products?.length > 0 ? (
        <>
          <div
            id="products"
            className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] w-full mb-8"
          >
            {state.products.map((product) => (
              <Card key={product.id} {...product} />
            ))}
          </div>
          {state?.pages > 1 && <Pagination {...state} />}
        </>
      ) : (
        <>
          <p>No products found</p>
          <NavLink href="/products" className="flex-0 w-fit">
            Reset filters
          </NavLink>
        </>
      )}
    </section>
  );
}
