"use client";
import NavLink from "@/components/NavLink";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { getUrlFromParams } from "@/lib/helpers";

/*
function toggleSearchParam(searchParams = null, key = null, value = null) {
  if (!searchParams || key === null || value === null) return;
  const keys = searchParams.getAll(key);
  if (keys.includes(value)) {
    searchParams.delete(key, value);
  } else {
    searchParams.append(key, value);
  }
}
*/

export default function FilterLink({ children, vendor, page, tag, className }) {
  const searchParams = useSearchParams();
  const currentTags =
    typeof searchParams.get("tags") === "string"
      ? [searchParams.get("tags")]
      : searchParams.get("tags");
  const price = searchParams.get("price");
  const currentVendors = usePathname().split("/");
  const pathname = usePathname();
  const isActive = currentTags?.includes(tag);
  console.log("FilterLink", {
    currentTags,
    vendor,
    currentVendors,
    tag,
    isActive,
    price,
  });

  return (
    <NavLink
      className={`text-left ${className}`}
      href={`${pathname}${getUrlFromParams({
        page,
        tags: tag ? [tag] : currentTags,
        vendor: currentTags,
        price,
      })}`}
      isActive={isActive}
    >
      {children}
    </NavLink>
  );
}
