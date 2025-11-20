import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slices/cartSlice";
import productSlice from "../slices/ProductSlice";
import searchSlice from "../slices/searchSlice";
import productFiltersSlice from "../slices/productFiltersSlice";
import userSlice from "../slices/userSlice";
import notificationsSlice from "../slices/notificationsSlice";

const isBrowser = typeof window !== "undefined" && window.localStorage;

const loadCartFromStorage = () => {
  if (!isBrowser) return [];
  try {
    const stored = window.localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load cart from storage", error);
    return [];
  }
};

const preloadedState = isBrowser
  ? {
      cart: loadCartFromStorage(),
    }
  : undefined;

const store = configureStore({
  reducer: {
    cart: cartSlice,
    product: productSlice,
    search: searchSlice,
    productFilters: productFiltersSlice,
    user: userSlice,
    notifications: notificationsSlice,
  },
  preloadedState,
});

if (isBrowser) {
  store.subscribe(() => {
    try {
      const state = store.getState();
      window.localStorage.setItem("cart", JSON.stringify(state.cart));
    } catch (error) {
      console.error("Failed to save cart to storage", error);
    }
  });
}

export default store;
