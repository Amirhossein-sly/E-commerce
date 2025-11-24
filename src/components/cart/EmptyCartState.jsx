import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function EmptyCartState() {
  return (
    <div className="pt-[120px] pb-24 max-w-7xl mx-auto px-4 text-center">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-gray-900/50 py-16 px-6 space-y-6 max-w-md mx-auto">
        <div className="text-6xl">
          <ShoppingCart className="mx-auto text-gray-300 dark:text-gray-600" size={80} />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Your cart is empty
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Add some products to your cart and start shopping!
        </p>
        <Link
          to="/products"
          className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );
}
