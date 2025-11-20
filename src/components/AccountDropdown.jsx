import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { logout } from "../slices/userSlice";
import { pushToast } from "../slices/notificationsSlice";

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
        className="hover:text-black transition flex items-center gap-1"
      >
        {isAuthenticated ? `Hi, ${user?.name || "User"}` : "Account"}
        <ChevronDown size={16} />
      </button>
      {open && (
        <div className="absolute mt-2 w-40 bg-white shadow-lg rounded-lg p-2 flex flex-col gap-1 z-50">
          {(isAuthenticated ? authLinks : guestLinks).map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className="text-left hover:bg-gray-100 rounded px-2 py-1 transition"
            >
              {item.label}
            </button>
          ))}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="text-left hover:bg-red-50 text-red-500 rounded px-2 py-1 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
}
