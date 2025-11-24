import StarRating from "../review/StarRating";

export default function ProductInfo({ product }) {
  return (
    <div className="space-y-6">
      {/* Category */}
      <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium uppercase tracking-wide">
        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
      </div>

      {/* عنوان محصول */}
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
        {product.title}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-4">
        <StarRating rating={4.5} size={20} />
        <span className="text-gray-500 dark:text-gray-400 text-sm">(4.5) • 128 reviews</span>
      </div>

      {/* قیمت */}
      <div className="flex items-center gap-4">
        <span className="text-4xl font-bold text-gray-900 dark:text-white">${product.price}</span>
        <span className="text-lg text-gray-500 dark:text-gray-400 line-through">$149.99</span>
        <span className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-3 py-1 rounded-full text-sm font-semibold">
          20% OFF
        </span>
      </div>

      {/* وضعیت موجودی */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-green-700 dark:text-green-400 font-medium">In Stock</span>
        </div>
        <span className="text-gray-500 dark:text-gray-400">•</span>
        <span className="text-gray-600 dark:text-gray-300">Free shipping</span>
      </div>

      {/* توضیحات */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          {product.description}
        </p>
      </div>
    </div>
  );
}
