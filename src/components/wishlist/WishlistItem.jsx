import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { removeFromWishlist } from "../../slices/wishlistSlice";
import { add } from "../../slices/cartSlice";
import { pushToast } from "../../slices/notificationsSlice";

export default function WishlistItem({ product }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const getQuantity = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  const handleRemoveFromWishlist = () => {
    dispatch(removeFromWishlist(product.id));
    dispatch(
      pushToast({
        message: "Removed from wishlist",
        type: "info",
      })
    );
  };

  const handleAddToCart = () => {
    dispatch(add(product));
    dispatch(
      pushToast({
        message: `${product.title.slice(0, 30)}... added to cart`,
        type: "success",
      })
    );
  };

  const quantity = getQuantity(product.id);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl dark:shadow-gray-900/50 transform hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col opacity-0 animate-fadeIn border border-gray-100 dark:border-gray-700">
      <Link to={`/product/${product.id}`} className="relative group">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-72 object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-15 transition duration-300 rounded-3xl" />

        {/* Remove from wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            handleRemoveFromWishlist();
          }}
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-red-50 transition-all duration-200"
          aria-label="Remove from wishlist"
        >
          <Heart className="text-red-500 fill-red-500" size={20} />
        </button>
      </Link>

      <div className="flex flex-col flex-grow p-6">
        <p className="font-semibold text-gray-800 dark:text-gray-200 text-lg line-clamp-2 mb-1 tracking-wide">
          {product.title}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm flex-grow capitalize">
          {product.category}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
            ${product.price}
          </span>

          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="bg-indigo-600 text-white px-5 py-2 rounded-xl shadow-sm hover:shadow-md hover:bg-indigo-500 transition-all"
            >
              <ShoppingCart size={16} className="inline mr-2" />
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-xl">
              <ShoppingCart size={16} />
              <span className="text-sm font-medium">In Cart ({quantity})</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
