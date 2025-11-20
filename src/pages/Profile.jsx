import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateProfile } from "../slices/userSlice";
import { pushToast } from "../slices/notificationsSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(profile));
    dispatch(
      pushToast({
        message: "Profile updated",
        type: "success",
      })
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-6 pt-[120px] pb-16">
      <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your profile</h1>
          <p className="text-gray-500 mt-2">
            Update your personal information and shipping details.
          </p>
        </div>

        {!isAuthenticated ? (
          <div className="text-center space-y-4 py-12">
            <p className="text-gray-600">
              برای مشاهده پروفایل ابتدا وارد حساب کاربری خود شوید.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/login"
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
              >
                Go to Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 rounded-xl border border-gray-200 text-gray-800 hover:bg-gray-50 transition"
              >
                Create Account
              </Link>
            </div>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={profile.name}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="address">
              Shipping address
            </label>
            <textarea
              id="address"
              name="address"
              value={profile.address}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-xl py-3 font-semibold hover:bg-indigo-500 transition"
          >
            Save changes
          </button>
          </form>
        )}
      </div>
    </div>
  );
}

