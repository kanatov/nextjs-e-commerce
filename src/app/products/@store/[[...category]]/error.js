"use client";
export default function ErrorPage({ error }) {
  return (
    <section className="border-2 flex-1">
      <h1>Error</h1>
      <pre>{JSON.stringify(error.message, null, 2)}</pre>
    </section>
  );
}
