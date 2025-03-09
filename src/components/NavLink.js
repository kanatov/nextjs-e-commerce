import Link from "next/link";
function NavLink({ children, href, className, isActive }) {
  return (
    <Link
      href={href}
      className={`block py-1 px-3 rounded-sm border-b-2 border-transparent hover:border-gray-300 bg-gray-100 text-center ${
        isActive ? "font-bold bg-gray-300 cursor-auto pointer-events-none" : ""
      } ${className}`}
    >
      {children}
    </Link>
  );
}
export default NavLink;
