import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navigation() {
  // گرفتن تعداد آیتم‌ها از Redux
  const cart = useSelector((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* لوگو */}
          <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
            Shopcart
          </Link>

          {/* منو */}
          <div className="flex items-center gap-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">
              Home
            </Link>

            <Link to="/cart" className="relative text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
