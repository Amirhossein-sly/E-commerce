export default function ErrorState({ message }) {
  const errorMessage = message || "Error loading new arrivals";

  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-bold text-red-500 dark:text-red-400 mb-4">
        Oops! Something went wrong
      </h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
        {errorMessage}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
