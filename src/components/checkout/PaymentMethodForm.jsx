import { useSelector, useDispatch } from "react-redux";
import { CreditCard } from "lucide-react";
import { setPaymentMethod } from "../../slices/checkoutSlice";

export default function PaymentMethodForm() {
  const dispatch = useDispatch();
  const paymentMethod = useSelector((state) => state.checkout.paymentMethod);

  const paymentOptions = [
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, American Express",
      icon: <CreditCard size={20} className="text-gray-600 dark:text-gray-400" />
    },
    {
      id: "paypal",
      name: "PayPal",
      description: "Pay with your PayPal account",
      icon: <div className="w-5 h-5 bg-blue-600 rounded"></div>
    },
    {
      id: "cash",
      name: "Cash on Delivery",
      description: "Pay when you receive your order",
      icon: <span className="text-2xl">💵</span>
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-gray-900/50 p-8">
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="text-indigo-600" size={24} />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Payment Method
        </h2>
      </div>

      <div className="space-y-4">
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => dispatch(setPaymentMethod(option.id))}
            className={`p-4 border-2 rounded-xl cursor-pointer transition ${
              paymentMethod === option.id
                ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20"
                : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
            }`}
          >
            <div className="flex items-center gap-3">
              {option.icon}
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {option.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {option.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {paymentMethod === "card" && (
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Card Number
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                CVV
              </label>
              <input
                type="text"
                placeholder="123"
                className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
