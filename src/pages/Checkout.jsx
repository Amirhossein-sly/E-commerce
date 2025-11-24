import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import {
  setProcessing,
  setOrderId,
  setError,
  resetCheckout,
} from "../slices/checkoutSlice";
import { clearCart } from "../slices/cartSlice";
import { pushToast } from "../slices/notificationsSlice";
import CheckoutStepper from "../components/checkout/CheckoutStepper";
import CustomerInfoForm from "../components/checkout/CustomerInfoForm";
import PaymentMethodForm from "../components/checkout/PaymentMethodForm";
import OrderSummary from "../components/checkout/OrderSummary";
import OrderReview from "../components/checkout/OrderReview";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const checkout = useSelector((state) => state.checkout);
  const user = useSelector((state) => state.user);
  const [currentStep, setCurrentStep] = useState(1); // 1: Information, 2: Payment, 3: Review

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  // Auto-fill customer info from user profile if logged in
  useEffect(() => {
    if (user.isAuthenticated && user.user && !checkout.customerInfo.firstName) {
      dispatch(
        updateCustomerInfo({
          firstName: user.user.firstName || "",
          lastName: user.user.lastName || "",
          email: user.user.email || "",
          phone: user.user.phone || "",
        })
      );
    }
  }, [user, dispatch, checkout.customerInfo.firstName]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "postalCode"];
    const missingFields = requiredFields.filter(field => !checkout.customerInfo[field].trim());

    if (missingFields.length > 0) {
      dispatch(setError("Please fill in all required fields"));
      dispatch(pushToast({
        message: "Please fill in all required fields",
        type: "error",
      }));
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(checkout.customerInfo.email)) {
      dispatch(setError("Please enter a valid email address"));
      dispatch(pushToast({
        message: "Please enter a valid email address",
        type: "error",
      }));
      return;
    }

    dispatch(setError(null));
    dispatch(setProcessing(true));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate order ID
      const orderId = `ORD-${Date.now()}`;
      dispatch(setOrderId(orderId));

      // Clear cart and reset checkout
      dispatch(clearCart());
      dispatch(pushToast({
        message: `Order ${orderId} placed successfully!`,
        type: "success",
      }));

      // Navigate to success page
      navigate(`/order-success/${orderId}`);
    } catch (error) {
      dispatch(setError("Failed to process order. Please try again."));
      dispatch(pushToast({
        message: "Failed to process order. Please try again.",
        type: "error",
      }));
    } finally {
      dispatch(setProcessing(false));
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (cartItems.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="pt-[120px] pb-24 max-w-7xl mx-auto px-4 lg:px-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/cart"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
        >
          <ArrowLeft size={20} />
          Back to Cart
        </Link>
        <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1"></div>
      </div>

      {/* Progress Steps */}
      <CheckoutStepper currentStep={currentStep} />

      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        {/* Main Content */}
        <div className="space-y-8">
          {/* Step 1: Customer Information */}
          {currentStep === 1 && <CustomerInfoForm />}

          {/* Step 2: Payment Method */}
          {currentStep === 2 && <PaymentMethodForm />}

          {/* Step 3: Review Order */}
          {currentStep === 3 && <OrderReview />}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={checkout.isProcessing}
                className="px-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {checkout.isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    Place Order
                  </>
                )}
              </button>
            )}
          </div>

          {checkout.error && (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
              <AlertCircle size={16} />
              {checkout.error}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <OrderSummary />
      </div>
    </div>
  );
}
