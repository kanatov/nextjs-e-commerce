"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { getUrlFromParams } from "@/lib/helpers";

export default function VendorLink({ children, vendor, page, className }) {
  const searchParams = useSearchParams();
  const currentTags = searchParams.get("tags");
  const currentVendors = usePathname().split("/");
  const pathname = currentVendors[1];
  const isActive = currentVendors?.includes(vendor);
  console.log("VendorLink", {
    currentTags,
    vendor,
    currentVendors,
    isActive,
  });

  return (
    <Link
      className={`${className} p-1 ${isActive ? "font-bold bg-gray-300" : ""}`}
      href={`/${pathname}/${vendor}${getUrlFromParams({
        page,
        tags: currentTags,
      })}`}
    >
      {children}
    </Link>
  );
}
