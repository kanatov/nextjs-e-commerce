import Link from "next/link";
import { getAllTags } from "@/lib/data";

export default async function Sidebar() {
  const tags = await getAllTags();
  return (
    <nav className="w-40 pl-4 fixed">
      <h6 className="font-bold mb-4">Filter by</h6>
      <ul>
        <li>
          <Link href="/products">All</Link>
        </li>
        {tags.map((tag) => (
          <li key={tag}>
            <Link href={`/products?tags=${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
