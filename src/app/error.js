"use client";
import Link from "next/link";
export default function ErrorPage({ error }) {
  return (
    <section className="border-2 m-auto p-4 text-center w-96">
      <h1>Ups!</h1>
      <p>Something went wrong:</p>
      <pre className="border-2 border-gray-400 p-4 m-4">
        {JSON.stringify(error.message, null, 2)}
      </pre>
      <Link href="/">Go back to home page</Link>
    </section>
  );
}
