import NavLink from "@/components/NavLink";
export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <NavLink href="/" className="w-32">
        <h1>PetLabCo.</h1>
      </NavLink>
    </header>
  );
}
