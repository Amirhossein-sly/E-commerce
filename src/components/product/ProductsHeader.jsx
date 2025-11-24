export default function ProductsHeader({ totalCount = 0, visibleCount = 0 }) {
  return (
    <header className="mb-10">
      <p className="text-sm uppercase tracking-widest text-indigo-500 dark:text-indigo-400 font-semibold">
        Shop
      </p>
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-2 mb-4">
        Browse All Products
      </h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mb-6">
        Use the filters to narrow down categories, sort by price, and quickly
        find exactly what you need. All powered by Redux data and Tailwind
        styles.
      </p>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Showing <span className="font-semibold text-gray-800 dark:text-gray-200">{visibleCount}</span>{" "}
        of <span className="font-semibold text-gray-800 dark:text-gray-200">{totalCount}</span> products
      </div>
    </header>
  );
}

