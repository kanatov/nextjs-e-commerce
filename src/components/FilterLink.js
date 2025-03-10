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
  const currentVendors = usePathname().split("/")[3];
  const pathname = usePathname();
  const isActive = currentTags?.includes(tag);

  return (
    <NavLink
      className={`text-left ${className}`}
      href={`${pathname}${getUrlFromParams({
        page,
        tags: tag ? [tag] : currentTags,
        ...(currentVendors && { vendor: currentVendors }),
        price,
      })}`}
      isActive={isActive}
    >
      {children}
    </NavLink>
  );
}
