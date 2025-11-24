export default function ProductSkeleton({ animationDelay = 0 }) {
  return (
    <div
      style={{ animationDelay: `${animationDelay}ms` }}
      className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col opacity-0 animate-fadeIn"
    >
      {/* Image skeleton */}
      <div className="relative bg-gray-200 animate-pulse">
        <div className="w-full h-72"></div>
      </div>

      <div className="flex flex-col flex-grow p-6 space-y-4">
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        </div>

        {/* Category skeleton */}
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>

        {/* Price and button skeleton */}
        <div className="flex items-center justify-between mt-4">
          <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded-xl w-28 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
