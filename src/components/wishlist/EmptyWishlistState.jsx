import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function EmptyWishlistState() {
  return (
    <div className="pt-[120px] pb-24 max-w-7xl mx-auto px-4 text-center">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-gray-900/50 py-16 px-6 space-y-6 max-w-md mx-auto">
        <div className="text-6xl">
          <Heart className="mx-auto text-red-300 dark:text-red-600" size={80} />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Your wishlist is empty
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Save items you love for later. Start browsing our collection and add your favorites to your wishlist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-colors"
          >
            Start Shopping
          </Link>
          <Link
            to="/"
            className="inline-block px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Browse Home
          </Link>
        </div>
      </div>
    </div>
  );
}
