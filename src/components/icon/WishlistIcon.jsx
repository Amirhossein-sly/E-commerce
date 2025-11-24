import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Heart } from "lucide-react";

export default function WishlistIcon() {
  const wishlistItems = useSelector(state => state.wishlist);
  const totalItems = wishlistItems.length;

  return (
    <Link to="/wishlist" className="relative flex items-center text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition">
      <Heart size={22} />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
