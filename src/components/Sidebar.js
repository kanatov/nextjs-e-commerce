import Link from "next/link";
import FilterLink from "@/components/FilterLink";
import VendorLink from "@/components/VendorLink";
import { getAllTags, getAllVendors } from "@/lib/data";

export default async function Sidebar() {
  const tags = await getAllTags();
  const vendors = await getAllVendors();
  return (
    <nav className="w-40 pl-4 fixed flex flex-col gap-4">
      <Link href="/products">All</Link>
      <hr className="opacity-45" />
      <h6 className="font-bold">Vendor</h6>
      <ul className="flex flex-col gap-2">
        {vendors.map((vendor) => (
          <li key={vendor}>
            <VendorLink vendor={vendor} page={1}>
              {vendor}
            </VendorLink>
          </li>
        ))}
      </ul>
      <hr className="opacity-45" />
      <h6 className="font-bold">Filter by</h6>
      <ul className="flex flex-col gap-2">
        {tags.map((tag) => (
          <li key={tag}>
            <FilterLink tag={tag} page={1}>
              {tag}
            </FilterLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
