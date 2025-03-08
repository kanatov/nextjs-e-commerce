import Link from "next/link";
export default function Sidebar() {
  return (
    <div className="w-32 border-2">
      <h6>Filter by</h6>
      <ul>
        <li>
          <Link href={"/products?tag=dog"}>Dog</Link>
        </li>
        <li>
          <Link href={"/products?tag=cat"}>Cat</Link>
        </li>
        <li>
          <Link href={"/products?tag=chews"}>Chews</Link>
        </li>
      </ul>
    </div>
  );
}
