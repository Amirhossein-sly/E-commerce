import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dismissToast } from "../slices/notificationsSlice";
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from "lucide-react";

const iconMap = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
};

const bgMap = {
  success: "bg-green-50 border-green-200 text-green-800",
  info: "bg-blue-50 border-blue-200 text-blue-700",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  error: "bg-red-50 border-red-200 text-red-700",
};

export default function ToastPortal() {
  const toasts = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    const timers = toasts.map((toast) => {
      const timer = setTimeout(() => {
        dispatch(dismissToast(toast.id));
      }, toast.duration);
      return timer;
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [toasts, dispatch]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-[100] flex flex-col gap-3 w-full max-w-xs sm:max-w-sm">
      {toasts.map((toast) => {
        const Icon = iconMap[toast.type] || Info;
        return (
          <div
            key={toast.id}
            className={`flex items-start gap-3 rounded-2xl border shadow-lg p-4 animate-slideIn ${bgMap[toast.type]}`}
          >
            <Icon className="flex-shrink-0" size={20} />
            <p className="text-sm flex-1">{toast.message}</p>
            <button
              className="text-current hover:text-gray-900"
              onClick={() => dispatch(dismissToast(toast.id))}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

