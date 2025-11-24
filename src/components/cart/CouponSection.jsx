import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyCoupon, selectCouponStatus, selectCartCalculations } from "../../slices/cartOperationsSlice";
import { pushToast } from "../../slices/notificationsSlice";
import { CheckCircle2, X } from "lucide-react";

export default function CouponSection() {
  const [couponCode, setCouponCode] = useState("");
  const dispatch = useDispatch();
  const couponStatus = useSelector(selectCouponStatus);
  const cartCalculations = useSelector(selectCartCalculations);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      dispatch(pushToast({
        message: "Enter a coupon code first.",
        type: "error",
      }));
      return;
    }

    const code = couponCode.trim().toUpperCase();
    dispatch(applyCoupon({ code, subtotal: cartCalculations.subtotal }));

    // Dispatch toast based on coupon status
    setTimeout(() => {
      if (couponStatus) {
        dispatch(pushToast({
          message: couponStatus.message,
          type: couponStatus.type,
        }));
      }
    }, 0);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-gray-900/50 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Have a coupon?
      </h3>

      <div className="flex gap-3">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter coupon code"
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={handleApplyCoupon}
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-colors"
        >
          Apply
        </button>
      </div>

      {couponStatus && (
        <div className={`mt-3 p-3 rounded-xl flex items-center gap-2 ${
          couponStatus.type === "success"
            ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
            : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
        }`}>
          {couponStatus.type === "success" ? (
            <CheckCircle2 size={16} />
          ) : (
            <X size={16} />
          )}
          <span className="text-sm">{couponStatus.message}</span>
        </div>
      )}
    </div>
  );
}
