"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { getUrlFromParams } from "@/lib/helpers";

export default function NavLink({ children, page, className }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  return (
    <Link
      className={className}
      href={`${pathname}${getUrlFromParams({
        page,
        tags: searchParams.get("tags"),
      })}`}
    >
      {children}
    </Link>
  );
}
