import { useSelector } from "react-redux";
import EmptyWishlistState from "../components/wishlist/EmptyWishlistState";
import WishlistItem from "../components/wishlist/WishlistItem";

export default function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist);

  if (wishlist.length === 0) {
    return <EmptyWishlistState />;
  }

  return (
    <div className="pt-[120px] pb-24 max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Wishlist</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {wishlist.map((product) => (
          <WishlistItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
