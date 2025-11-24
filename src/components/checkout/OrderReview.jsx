import { useSelector, useDispatch } from "react-redux";
import { CheckCircle2 } from "lucide-react";
import { setOrderNotes } from "../../slices/checkoutSlice";

export default function OrderReview() {
  const dispatch = useDispatch();
  const checkout = useSelector((state) => state.checkout);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-gray-900/50 p-8">
      <div className="flex items-center gap-3 mb-6">
        <CheckCircle2 className="text-indigo-600" size={24} />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Review Your Order
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Customer Information
          </h3>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 space-y-2">
            <p className="text-gray-900 dark:text-white">
              {checkout.customerInfo.firstName} {checkout.customerInfo.lastName}
            </p>
            <p className="text-gray-600 dark:text-gray-400">{checkout.customerInfo.email}</p>
            <p className="text-gray-600 dark:text-gray-400">{checkout.customerInfo.phone}</p>
            <p className="text-gray-600 dark:text-gray-400">
              {checkout.customerInfo.address}, {checkout.customerInfo.city} {checkout.customerInfo.postalCode}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Payment Method
          </h3>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <p className="text-gray-900 dark:text-white capitalize">
              {checkout.paymentMethod === "card" ? "Credit/Debit Card" :
               checkout.paymentMethod === "paypal" ? "PayPal" : "Cash on Delivery"}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Order Notes
          </h3>
          <textarea
            value={checkout.orderNotes}
            onChange={(e) => dispatch(setOrderNotes(e.target.value))}
            placeholder="Any special instructions for delivery..."
            className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}
