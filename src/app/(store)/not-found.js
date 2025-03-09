import NavLink from "@/components/NavLink";

export default function VendorNotFound() {
  return (
    <section className="border-2 m-8 p-8 text-center w-full flex flex-col gap-4 items-center">
      <h1>Ups!</h1>
      <p>There is no such vendor.</p>
      <NavLink href="/products" className="flex-0 w-fit">
        Back to store
      </NavLink>
    </section>
  );
}
