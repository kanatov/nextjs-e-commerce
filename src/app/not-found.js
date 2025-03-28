import NavLink from "@/components/NavLink";

export default function VendorNotFound() {
  return (
    <section className="border-2 m-8 p-8 text-center w-full flex flex-col gap-4 items-center">
      <h1>404</h1>
      <p>Page is not found</p>
      <NavLink href="/" className="flex-0 w-fit">
        Go back to home page
      </NavLink>
    </section>
  );
}
