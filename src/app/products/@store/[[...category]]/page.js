import { getProducts } from "@/lib/data";
import Pagination from "@/components/Pagination";
import Card from "@/components/Card";
import { getFiltersFromParams } from "@/lib/helpers";

export default async function Page(params) {
  // Not supporting categories yet
  const slug = await params.params;
  if (slug?.category) {
    throw new Error(`Invalid category: ${slug.category}`);
  }

  // Products and pagination
  const filters = await getFiltersFromParams(params);
  filters.path = "/products";
  const paginatedProducts = await getProducts(filters);
  const state = {
    ...paginatedProducts,
    ...filters,
  };

  return (
    <section className="ml-40 w-full">
      {state.tags.length ? (
        <h2>Filtering by: {state.tags.join(", ")}</h2>
      ) : (
        <h2>All products</h2>
      )}
      {state.products?.length > 0 ? (
        <>
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(400px,1fr))] w-full mb-8">
            {state.products.map((product) => (
              <Card key={product.id} {...product} />
            ))}
          </div>
          {state?.pages > 1 && <Pagination {...state} />}
        </>
      ) : (
        <p>No products found</p>
      )}
    </section>
  );
}
