import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";

export default function CartIcon() {
  const cartItems = useSelector(state => state.cart);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link to="/cart" className="relative flex items-center hover:text-black transition">
      <ShoppingCart size={22} />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
