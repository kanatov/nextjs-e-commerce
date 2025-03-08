export default async function Page(params) {
  // The current data doen't have a category field,
  // Hovewere I handle an invalid category here to handle an edge case.
  const filters = await params.searchParams;
  const slug = await params.params;
  if (slug?.category) {
    throw new Error(`Invalid category: ${slug.category}`);
  }

  return (
    <section className="border-2 flex-1">
      <h1>Category</h1>
      <pre>{JSON.stringify(filters, null, 2)}</pre>
    </section>
  );
}
