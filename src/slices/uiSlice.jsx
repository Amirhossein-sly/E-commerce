import { createSlice } from "@reduxjs/toolkit";

// UI state management (modals, loading states, etc.)
const uiSlice = createSlice({
  name: "ui",
  initialState: {
    // Modal states
    isCartModalOpen: false,
    isWishlistModalOpen: false,
    isSearchModalOpen: false,

    // Loading states
    isAddingToCart: false,
    isRemovingFromCart: false,
    isApplyingCoupon: false,

    // Notification preferences
    toastPosition: "top-right",
    toastDuration: 4000,

    // Layout preferences
    sidebarCollapsed: false,
    theme: "system", // light, dark, system

    // Navigation
    activeSection: "home",
    breadcrumbs: [],
  },
  reducers: {
    // Modal actions
    openCartModal: (state) => {
      state.isCartModalOpen = true;
    },
    closeCartModal: (state) => {
      state.isCartModalOpen = false;
    },
    toggleCartModal: (state) => {
      state.isCartModalOpen = !state.isCartModalOpen;
    },

    openWishlistModal: (state) => {
      state.isWishlistModalOpen = true;
    },
    closeWishlistModal: (state) => {
      state.isWishlistModalOpen = false;
    },
    toggleWishlistModal: (state) => {
      state.isWishlistModalOpen = !state.isWishlistModalOpen;
    },

    openSearchModal: (state) => {
      state.isSearchModalOpen = true;
    },
    closeSearchModal: (state) => {
      state.isSearchModalOpen = false;
    },
    toggleSearchModal: (state) => {
      state.isSearchModalOpen = !state.isSearchModalOpen;
    },

    // Loading states
    setAddingToCart: (state, action) => {
      state.isAddingToCart = action.payload;
    },
    setRemovingFromCart: (state, action) => {
      state.isRemovingFromCart = action.payload;
    },
    setApplyingCoupon: (state, action) => {
      state.isApplyingCoupon = action.payload;
    },

    // UI preferences
    setToastPosition: (state, action) => {
      state.toastPosition = action.payload;
    },
    setToastDuration: (state, action) => {
      state.toastDuration = action.payload;
    },

    // Layout
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },

    // Navigation
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },
    setBreadcrumbs: (state, action) => {
      state.breadcrumbs = action.payload;
    },
    addBreadcrumb: (state, action) => {
      state.breadcrumbs.push(action.payload);
    },
    removeBreadcrumb: (state) => {
      state.breadcrumbs.pop();
    },
    clearBreadcrumbs: (state) => {
      state.breadcrumbs = [];
    },
  },
});

export const {
  // Modal actions
  openCartModal,
  closeCartModal,
  toggleCartModal,
  openWishlistModal,
  closeWishlistModal,
  toggleWishlistModal,
  openSearchModal,
  closeSearchModal,
  toggleSearchModal,

  // Loading states
  setAddingToCart,
  setRemovingFromCart,
  setApplyingCoupon,

  // UI preferences
  setToastPosition,
  setToastDuration,

  // Layout
  toggleSidebar,
  setSidebarCollapsed,
  setTheme,

  // Navigation
  setActiveSection,
  setBreadcrumbs,
  addBreadcrumb,
  removeBreadcrumb,
  clearBreadcrumbs,
} = uiSlice.actions;

export default uiSlice.reducer;
