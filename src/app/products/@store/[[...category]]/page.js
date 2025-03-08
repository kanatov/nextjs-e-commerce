import { getProducts } from "@/lib/data";

export default async function Page(params) {
  const filters = await params.searchParams;
  const slug = await params.params;
  if (slug?.category) {
    throw new Error(`Invalid category: ${slug.category}`);
  }

  const products = await getProducts({ tags: filters.tag });
  return (
    <section className="border-2 flex-1">
      <h1>Category</h1>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <pre>{JSON.stringify(products, null, 2)}</pre>
      )}
    </section>
  );
}
