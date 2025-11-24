export default function LoadingState() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-[120px] pb-24">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-400 animate-pulse">
          Loading amazing products...
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          Please wait while we fetch the latest arrivals
        </p>
      </div>
    </div>
  );
}
