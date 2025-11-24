import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, Package, Truck, Home } from "lucide-react";

export default function OrderSuccess() {
  const { orderId } = useParams();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-[120px] pb-24 max-w-4xl mx-auto px-4 lg:px-6">
      <div className="text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Order Placed Successfully! 🎉
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
          Thank you for your purchase. Your order has been confirmed and is being processed.
        </p>

        {orderId && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Order ID: <span className="font-mono font-semibold">{orderId}</span>
          </p>
        )}

        {/* Order Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-gray-900/50 p-8 mb-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            What's Next?
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Order Confirmation
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You'll receive an email confirmation with your order details and tracking information.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Shipping Updates
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We'll send you shipping updates as your order is prepared and shipped. Estimated delivery: 3-5 business days.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Order Tracking
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Track your order status and delivery updates through your account dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Continue Shopping
          </Link>

          <Link
            to="/profile"
            className="px-8 py-3 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            View Order History
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Need Help?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            If you have any questions about your order, feel free to contact our support team.
          </p>
          <Link
            to="/contact"
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium"
          >
            Contact Support →
          </Link>
        </div>
      </div>
    </div>
  );
}
