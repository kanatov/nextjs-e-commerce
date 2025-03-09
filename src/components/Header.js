import Link from "next/link";
export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 p-4 bg-white shadow-md">
      <Link href="/">
        <h1>PetLabCo.</h1>
      </Link>
    </header>
  );
}
