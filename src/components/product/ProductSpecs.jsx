export default function ProductSpecs({ product }) {
  const specs = [
    { label: "Category", value: product.category },
    { label: "Rating", value: "4.5/5" },
    { label: "Reviews", value: "128" },
    { label: "Stock Status", value: "In Stock" },
    { label: "Shipping", value: "Free" },
    { label: "Warranty", value: "1 Year" }
  ];

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Specifications</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specs.map((spec, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
            <span className="text-gray-600 dark:text-gray-400 font-medium">{spec.label}</span>
            <span className="text-gray-900 dark:text-white">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
