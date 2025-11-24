import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { remove, updateQuantity } from "../../slices/cartSlice";
import { pushToast } from "../../slices/notificationsSlice";

export default function CartItem({ product, quantity }) {
  const dispatch = useDispatch();

  const handleQuantityChange = (change) => {
    if (change < 0 && quantity <= 1) return;
    dispatch(updateQuantity({ id: product.id, change }));
    dispatch(
      pushToast({
        message: `${change > 0 ? "+" : "-"}1 item`,
        type: change > 0 ? "info" : "warning",
      })
    );
  };

  const handleRemove = () => {
    dispatch(remove(product.id));
    dispatch(
      pushToast({
        message: `${product.title.slice(0, 20)}... removed from cart`,
        type: "warning",
      })
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md dark:shadow-gray-900/50 p-6 flex flex-col md:flex-row gap-6">
      <Link
        to={`/product/${product.id}`}
        className="w-full md:w-32 h-32 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer group"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
        />
      </Link>

      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
          <Link to={`/product/${product.id}`} className="group">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer">
              {product.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
            {product.category}
          </p>
        </div>
        <p className="text-xl font-bold text-gray-900 dark:text-white">
          ${(product.price * quantity).toFixed(2)}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="w-8 h-8 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="px-3 font-semibold text-gray-900 dark:text-white">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="w-8 h-8 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={handleRemove}
            className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}
