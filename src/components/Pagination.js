import FilterLink from "@/components/FilterLink";

export default function Pagination({
  page = 1,
  pages = 1,
  previous = null,
  next = null,
  tags = [],
}) {
  console.log("pagination", { page, pages, previous, next, tags });

  return (
    <div className="flex gap-4 justify-start">
      {previous && (
        <FilterLink page={page - 1} tags={tags}>
          Previous
        </FilterLink>
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
          <FilterLink key={i} page={i + 1} tags={tags}>
            {i + 1}
          </FilterLink>
        )
      )}
      {next && (
        <FilterLink page={page + 1} tags={tags}>
          Next
        </FilterLink>
      )}
    </div>
  );
}
