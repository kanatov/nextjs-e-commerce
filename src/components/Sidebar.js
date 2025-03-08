import Link from "next/link";
import { getAllTags } from "@/lib/data";

export default async function Sidebar() {
  const tags = await getAllTags();
  return (
    <nav className="w-32 border-2">
      <h6>Filter by</h6>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>
            <Link href={`/products?tag=${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
