export default function ProductDetailSkeleton() {
  return (
    <div className="pt-[120px] pb-24 flex flex-col gap-12 max-w-7xl mx-auto px-4 lg:px-6">
      {/* Main product section skeleton */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* Image skeleton */}
        <div className="flex-1 flex justify-center items-center bg-gray-100 rounded-2xl p-8">
          <div className="w-80 h-80 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Details skeleton */}
        <div className="flex-1 flex flex-col justify-center space-y-6">
          <div className="space-y-3">
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-4/5 animate-pulse"></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-12 bg-gray-200 rounded-xl w-32 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded-xl w-24 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Related products skeleton */}
      <div className="mt-12">
        <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
