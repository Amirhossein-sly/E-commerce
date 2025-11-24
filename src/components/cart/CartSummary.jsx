import { Link } from "react-router-dom";
import { selectCartCalculations } from "../../slices/cartOperationsSlice";
import { useSelector } from "react-redux";

export default function CartSummary() {
  const cartCalculations = useSelector(selectCartCalculations);
  const { subtotal, couponDiscount, shipping, total } = cartCalculations;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-gray-900/50 p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Order Summary
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {couponDiscount > 0 && (
          <div className="flex justify-between text-green-600 dark:text-green-400">
            <span>Coupon savings</span>
            <span>- ${couponDiscount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Shipping</span>
          <span className="text-gray-900 dark:text-white">
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <Link
        to="/checkout"
        className="w-full block text-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-colors"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
