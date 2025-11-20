const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "alpha", label: "Alphabetical" },
];

export default function ProductsFilters({
  categories = [],
  selectedCategory,
  sortBy,
  onCategoryChange,
  onSortChange,
  visibleCount,
  totalCount,
}) {
  const progress =
    totalCount === 0 ? 0 : Math.min(100, Math.round((visibleCount / totalCount) * 100));

  return (
    <section className="bg-white rounded-3xl shadow-lg p-6 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-2">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange?.(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all"
                  ? "All"
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-2">Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange?.(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col justify-end">
          <p className="text-sm text-gray-500 mb-1">
            Showing {visibleCount} product{visibleCount === 1 ? "" : "s"}
          </p>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

