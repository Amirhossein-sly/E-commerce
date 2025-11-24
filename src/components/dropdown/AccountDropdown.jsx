import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { logout } from "../../slices/userSlice";
import { pushToast } from "../../slices/notificationsSlice";

export default function AccountDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(
      pushToast({
        message: "Logged out",
        type: "info",
      })
    );
    setOpen(false);
  };

  const guestLinks = [
    { label: "Login", path: "/login" },
    { label: "Sign Up", path: "/signup" },
  ];

  const authLinks = [{ label: "Profile", path: "/profile" }];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition flex items-center gap-1"
      >
        {isAuthenticated ? `Hi, ${user?.name || "User"}` : "Account"}
        <ChevronDown size={16} />
      </button>
      {open && (
        <div className="absolute mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 rounded-lg p-2 flex flex-col gap-1 z-50 border border-gray-200 dark:border-gray-700">
          {(isAuthenticated ? authLinks : guestLinks).map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className="text-left text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-2 py-1 transition"
            >
              {item.label}
            </button>
          ))}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="text-left hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 dark:text-red-400 rounded px-2 py-1 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
}
