import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, updateQuantity, remove } from "../../slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../slices/wishlistSlice";
import { pushToast } from "../../slices/notificationsSlice";

export default function ProductActions({ product, productId, quantityInCart, isInWishlist }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(add(product));
    dispatch(pushToast({
      message: `${product.title.slice(0, 30)}... added to cart`,
      type: "success",
    }));
  };

  const handleIncrease = () => {
    dispatch(updateQuantity({ id: productId, change: 1 }));
  };

  const handleDecrease = () => {
    dispatch(updateQuantity({ id: productId, change: -1 }));
  };

  const handleRemove = () => {
    dispatch(remove(productId));
    dispatch(pushToast({
      message: `${product.title.slice(0, 30)}... removed from cart`,
      type: "warning",
    }));
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(productId));
      dispatch(pushToast({
        message: `${product.title.slice(0, 30)}... removed from wishlist`,
        type: "info",
      }));
    } else {
      dispatch(addToWishlist(product));
      dispatch(pushToast({
        message: `${product.title.slice(0, 30)}... added to wishlist`,
        type: "success",
      }));
    }
  };

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        {quantityInCart === 0 ? (
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-500 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            🛒 Add to Cart
          </button>
        ) : (
          <div className="flex-1 flex items-center justify-center gap-4 bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <span className="font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-xl">
              <button
                onClick={handleDecrease}
                disabled={quantityInCart <= 1}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-l-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
              <span className="px-6 py-2 font-semibold text-gray-900 dark:text-gray-100">{quantityInCart}</span>
              <button
                onClick={handleIncrease}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-r-xl"
              >
                +
              </button>
            </div>
            <button
              onClick={handleRemove}
              className="bg-red-500 text-white px-6 py-2 rounded-xl font-medium hover:bg-red-600 transition-all duration-200 flex items-center gap-2"
              title="Remove from cart"
            >
              🗑️ Remove
            </button>
          </div>
        )}

        <button className="flex-1 border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-50 transition-all">
          ⚡ Buy Now
        </button>
      </div>

      {quantityInCart > 0 && (
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
          ✓ Added to cart ({quantityInCart})
        </div>
      )}

      {/* Secondary Actions */}
      <div className="flex items-center gap-4 text-sm">
        <button
          onClick={handleWishlistToggle}
          className={`flex items-center gap-2 transition-colors ${
            isInWishlist
              ? "text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300"
              : "text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
          }`}
        >
          {isInWishlist ? "❤️" : "🤍"} {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>
        <span className="text-gray-300 dark:text-gray-600">•</span>
        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
          🔗 Share
        </button>
        <span className="text-gray-300 dark:text-gray-600">•</span>
        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors">
          ⚖️ Compare
        </button>
      </div>
    </div>
  );
}
