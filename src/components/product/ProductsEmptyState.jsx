export default function ProductsEmptyState({ onReset }) {
  return (
    <div className="text-center mt-20">
      <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-4">No products match these filters</h2>
      <button
        onClick={onReset}
        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline font-medium"
      >
        Reset filters
      </button>
    </div>
  );
}

