import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slices/cartSlice";
import productSlice from "../slices/ProductSlice";
import searchSlice from "../slices/searchSlice";
import productFiltersSlice from "../slices/productFiltersSlice";
import searchFiltersSlice from "../slices/searchFiltersSlice";
import userSlice from "../slices/userSlice";
import notificationsSlice from "../slices/notificationsSlice";
import wishlistSlice from "../slices/wishlistSlice";
import checkoutSlice from "../slices/checkoutSlice";
import reviewsSlice from "../slices/reviewsSlice";
import cartOperationsSlice from "../slices/cartOperationsSlice";
import uiSlice from "../slices/uiSlice";

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
    searchFilters: searchFiltersSlice,
    user: userSlice,
    notifications: notificationsSlice,
    wishlist: wishlistSlice,
    checkout: checkoutSlice,
    reviews: reviewsSlice,
    cartOperations: cartOperationsSlice,
    ui: uiSlice,
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
