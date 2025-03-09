import NavLink from "@/components/NavLink";
import FilterLink from "@/components/FilterLink";
import VendorLink from "@/components/VendorLink";
import { getAllTags, getAllVendors, getPriceRange } from "@/lib/data";
import InputRange from "@/components/InputRange";

export default async function Sidebar() {
  const { min, max } = await getPriceRange();
  const tags = await getAllTags();
  const vendors = await getAllVendors();
  return (
    <nav className="w-40 p-4 pb-16 fixed top-16 left-0 bottom-0 flex flex-col gap-4 overflow-y-auto">
      <NavLink href="/products" className="flex-1">
        All
      </NavLink>
      <hr className="opacity-45" />
      <h6 className="font-bold">Vendor</h6>
      <ul className="flex flex-col gap-2">
        {vendors.map((vendor) => (
          <li key={vendor}>
            <VendorLink vendor={vendor} page={1} className="flex-1">
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
            <FilterLink tag={tag} page={1} className="flex-1">
              {tag}
            </FilterLink>
          </li>
        ))}
      </ul>
      <hr className="opacity-45" />
      <h6 className="font-bold">Max Price</h6>
      <InputRange min={Math.floor(min)} max={Math.ceil(max)} />
      <hr className="opacity-45" />
      <h6 className="font-bold">Subscription</h6>
      <ul className="flex flex-col gap-2"></ul>
    </nav>
  );
}
