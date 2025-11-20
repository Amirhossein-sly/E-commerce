import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, CheckCircle2, X } from "lucide-react";
import { remove, updateQuantity, clearCart } from "../slices/cartSlice";
import { pushToast } from "../slices/notificationsSlice";

export default function Cart() {
  const cartproducts = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponStatus, setCouponStatus] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const subtotal = cartproducts.reduce(
    (sum, product) => sum + product.quantity * product.price,
    0
  );
  const couponDiscount =
    appliedCoupon === "SAVE10" ? +(subtotal * 0.1).toFixed(2) : 0;
  let shipping = subtotal === 0 ? 0 : subtotal >= 100 ? 0 : 9.99;
  if (appliedCoupon === "FREESHIP" && subtotal > 0) {
    shipping = 0;
  }
  const total = subtotal - couponDiscount + shipping;
  const isCartEmpty = cartproducts.length === 0;

  const handleQuantityChange = (id, change, quantity) => {
    if (change < 0 && quantity <= 1) return;
    dispatch(updateQuantity({ id, change }));
    dispatch(
      pushToast({
        message: `${change > 0 ? "+" : "-"}1 item`,
        type: change > 0 ? "info" : "warning",
      })
    );
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponStatus({ type: "error", message: "Enter a coupon code first." });
      return;
    }
    const code = couponCode.trim().toUpperCase();
    if (code === "SAVE10" && subtotal >= 50) {
      setAppliedCoupon("SAVE10");
      dispatch(
        pushToast({
          message: "Coupon applied! 10% off your subtotal.",
          type: "success",
        })
      );
      setCouponStatus({
        type: "success",
        message: "Coupon applied! 10% off your subtotal.",
      });
    } else if (code === "FREESHIP" && subtotal > 0) {
      setAppliedCoupon("FREESHIP");
      dispatch(
        pushToast({
          message: "Coupon applied! Shipping is free now.",
          type: "success",
        })
      );
      setCouponStatus({
        type: "success",
        message: "Coupon applied! Shipping is now free.",
      });
    } else {
      setAppliedCoupon(null);
      dispatch(
        pushToast({
          message: "Coupon not valid for this order",
          type: "error",
        })
      );
      setCouponStatus({
        type: "error",
        message: "Coupon not valid for this order.",
      });
    }
  };

  return (
    <div className="pt-[120px] pb-16 max-w-7xl mx-auto px-4 lg:px-6">
      {isCartEmpty ? (
        <div className="text-center bg-white rounded-3xl shadow-lg py-16 px-6 space-y-6">
          <p className="text-4xl">🛍️</p>
          <h2 className="text-2xl font-semibold text-gray-900">
            Your cart is empty
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Looks like you haven&apos;t added anything to your bag yet. Browse
            our curated collections and find something you love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
            >
              Browse products
            </Link>
            <Link
              to="/"
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-800 hover:bg-gray-50 transition"
            >
              Continue exploring
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <section className="space-y-6">
            {cartproducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl shadow-md p-6 flex flex-col md:flex-row gap-6"
              >
                <div className="w-full md:w-32 h-32 bg-gray-50 rounded-2xl flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {product.category}
                      </p>
                    </div>
                    <p className="text-xl font-bold text-gray-900">
                      ${(product.price * product.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          handleQuantityChange(product.id, -1, product.quantity)
                        }
                        disabled={product.quantity <= 1}
                        className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-semibold text-gray-900 min-w-[2ch] text-center">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(product.id, 1, product.quantity)
                        }
                        className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => dispatch(remove(product.id))}
                      className="flex items-center gap-2 text-red-500 font-medium hover:text-red-600 transition"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section className="bg-white rounded-3xl shadow-lg p-6 space-y-6 h-fit sticky top-24">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Order summary
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Shipping calculated using current promo.
              </p>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon savings</span>
                  <span>- ${couponDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t pt-3 flex justify-between text-base font-semibold text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code (SAVE10 / FREESHIP)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
                >
                  Apply
                </button>
              </div>
              {couponStatus && (
                <p
                  className={`text-sm ${
                    couponStatus.type === "success"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {couponStatus.message}
                </p>
              )}
            </div>

            <button
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
              onClick={() => setShowCheckoutModal(true)}
            >
              Proceed to checkout
            </button>
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              Clear cart
            </button>

            <p className="text-xs text-gray-500 text-center">
              Need help? <Link to="/profile" className="underline">Contact our team</Link>
            </p>
          </section>
        </div>
      )}
      )}

      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-4 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setShowCheckoutModal(false)}
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <CheckCircle2 size={28} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Checkout preview
                </h3>
                <p className="text-sm text-gray-500">
                  This is a demo checkout flow for your portfolio.
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{cartproducts.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Total due</span>
                <span className="font-semibold text-gray-900">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              You can describe your intended checkout integration here (Stripe,
              Zarinpal, etc.) when demonstrating this portfolio.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:bg-indigo-500 transition"
                onClick={() => setShowCheckoutModal(false)}
              >
                Looks good!
              </button>
              <button
                className="flex-1 border border-gray-200 rounded-xl py-2.5 hover:bg-gray-50 transition"
                onClick={() => setShowCheckoutModal(false)}
              >
                Keep shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
