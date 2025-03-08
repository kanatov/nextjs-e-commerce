"use client";
import Link from "next/link";
export default function ErrorPage({ error }) {
  return (
    <section className="border-2 flex-1">
      <h1>Ups!</h1>
      <p>Something went wrong:</p>
      <pre>{JSON.stringify(error.message, null, 2)}</pre>
      <Link href="/">Go back to home</Link>
    </section>
  );
}
