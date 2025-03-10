"use client";
import NavLink from "@/components/NavLink";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { getUrlFromParams } from "@/lib/helpers";

export default function VendorLink({ children, vendor, page }) {
  const searchParams = useSearchParams();
  const currentTags = searchParams.get("tags");
  const currentVendors = usePathname().split("/");
  const pathname = currentVendors[1];
  const isActive = currentVendors?.includes(vendor);
  return (
    <NavLink
      className="text-left"
      href={`/${pathname}/${vendor}${getUrlFromParams({
        page,
        tags: currentTags,
      })}`}
      isActive={isActive}
    >
      {children}
    </NavLink>
  );
}
