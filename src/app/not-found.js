import Link from "next/link";
export default function VendorNotFound({ error }) {
  return (
    <section className="border-2 flex-1 m-auto p-4 text-center">
      <h1>Ups!</h1>
      <p>There is no such page.</p>
      <Link href="/">Go back to home page</Link>
    </section>
  );
}
