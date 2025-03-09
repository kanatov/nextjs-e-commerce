import NavLink from "@/components/NavLink";

export default function Pagination({
  page = 1,
  pages = 1,
  previous = null,
  next = null,
  tags = [],
}) {
  console.log("pagination", { page, pages, previous, next, tags });

  return (
    <div className="flex gap-4">
      {previous && (
        <NavLink page={page - 1} tags={tags}>
          Previous
        </NavLink>
      )}
      {Array.from({ length: pages }, (_, i) =>
        page === i + 1 ? (
          <button
            key={i}
            disabled={true}
            className="font-bold px-2 bg-gray-200"
          >
            {i + 1}
          </button>
        ) : (
          <NavLink key={i} page={i + 1} tags={tags} className="px-2">
            {i + 1}
          </NavLink>
        )
      )}
      {next && (
        <NavLink page={page + 1} tags={tags}>
          Next
        </NavLink>
      )}
    </div>
  );
}
