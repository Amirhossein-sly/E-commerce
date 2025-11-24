import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../slices/wishlistSlice";
import { remove } from "../slices/cartSlice";
import { pushToast } from "../slices/notificationsSlice";

export default function ProductCard({
  product,
  quantity = 0,
  animationDelay = 0,
  onAdd,
  onIncrease,
  onDecrease,
}) {
  const [clickAnim, setClickAnim] = useState({ plus: false, minus: false });
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const isInWishlist = wishlist.some(item => item.id === product.id);

  if (!product) return null;

  const triggerAnimation = (type) => {
    setClickAnim((prev) => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setClickAnim((prev) => ({ ...prev, [type]: false }));
    }, 150);
  };

  const handleIncrease = () => {
    if (!onIncrease) return;
    onIncrease();
    triggerAnimation("plus");
  };

  const handleDecrease = () => {
    if (!onDecrease) return;
    onDecrease();
    triggerAnimation("minus");
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the heart
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      dispatch(
        pushToast({
          message: "Removed from wishlist",
          type: "info",
        })
      );
    } else {
      dispatch(addToWishlist(product));
      dispatch(
        pushToast({
          message: "Added to wishlist",
          type: "success",
        })
      );
    }
  };

  return (
    <div
      style={{ animationDelay: `${animationDelay}ms` }}
      className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl dark:shadow-gray-900/50 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 overflow-hidden flex flex-col opacity-0 animate-fadeIn border border-gray-100 dark:border-gray-700"
    >
      <Link to={`/product/${product.id}`} className="relative group">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-72 object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-15 transition duration-300 rounded-3xl" />
      </Link>

      {/* Wishlist button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-red-50 transition-all duration-200 group/wishlist"
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          size={20}
          className={`transition-all duration-200 ${
            isInWishlist
              ? "text-red-500 fill-red-500 group-hover/wishlist:scale-110"
              : "text-gray-400 group-hover/wishlist:text-red-400 group-hover/wishlist:scale-110"
          }`}
        />
      </button>

      <div className="flex flex-col flex-grow p-6">
        <p className="font-semibold text-gray-800 dark:text-gray-200 text-lg line-clamp-2 mb-1 tracking-wide">
          {product.title}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm flex-grow">
          {product.category
            ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
            : ""}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">${product.price}</span>

          {quantity === 0 ? (
            <button
              onClick={onAdd}
              className="bg-gray-900 dark:bg-gray-700 text-white px-5 py-2 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-800 dark:hover:bg-gray-600 transition-all"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrease}
                className={`bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-lg shadow-sm transition-transform duration-150 ${
                  clickAnim.minus ? "scale-110" : ""
                }`}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-2 font-semibold text-gray-900 dark:text-gray-100">{quantity}</span>
              <button
                onClick={handleIncrease}
                className={`bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-lg shadow-sm transition-transform duration-150 ${
                  clickAnim.plus ? "scale-110" : ""
                }`}
              >
                +
              </button>
              <button
                onClick={() => {
                  dispatch(remove(product.id));
                  dispatch(
                    pushToast({
                      message: `${product.title.slice(0, 20)}... removed from cart`,
                      type: "warning",
                    })
                  );
                }}
                className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-sm hover:bg-red-600 transition-all duration-150 flex items-center gap-1"
                title="Remove from cart"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

