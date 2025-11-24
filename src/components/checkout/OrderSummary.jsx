import { useSelector } from "react-redux";
import { Truck } from "lucide-react";

export default function OrderSummary() {
  const cartItems = useSelector((state) => state.cart);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, product) => sum + product.quantity * product.price,
    0
  );
  const shipping = subtotal >= 100 || subtotal === 0 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-gray-900/50 p-6 space-y-6 h-fit sticky top-24">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Order Summary
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Order Items */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center p-2">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {item.title}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Qty: {item.quantity}
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Shipping</span>
          <span className="text-gray-900 dark:text-white">
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Tax</span>
          <span className="text-gray-900 dark:text-white">
            ${tax.toFixed(2)}
          </span>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between text-base font-semibold text-gray-900 dark:text-white">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Truck size={20} className="text-gray-600 dark:text-gray-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Estimated Delivery
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              3-5 business days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
