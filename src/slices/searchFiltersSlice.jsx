import { createSlice, createSelector } from "@reduxjs/toolkit";

// Advanced search and filter operations
const searchFiltersSlice = createSlice({
  name: "searchFilters",
  initialState: {
    query: "",
    category: "all",
    sortBy: "featured",
    priceRange: { min: 0, max: 1000 },
    rating: 0,
    inStockOnly: false,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.category = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setRatingFilter: (state, action) => {
      state.rating = action.payload;
    },
    setInStockOnly: (state, action) => {
      state.inStockOnly = action.payload;
    },
    clearAllFilters: (state) => {
      state.category = "all";
      state.priceRange = { min: 0, max: 1000 };
      state.rating = 0;
      state.inStockOnly = false;
    },
    resetSearch: () => ({
      query: "",
      category: "all",
      sortBy: "featured",
      priceRange: { min: 0, max: 1000 },
      rating: 0,
      inStockOnly: false,
    }),
  },
});

export const {
  setSearchQuery,
  setCategoryFilter,
  setSortBy,
  setPriceRange,
  setRatingFilter,
  setInStockOnly,
  clearAllFilters,
  resetSearch,
} = searchFiltersSlice.actions;

// Advanced filtering selector
export const selectFilteredAndSortedProducts = createSelector(
  [
    (state) => state.product.data,
    (state) => state.searchFilters,
  ],
  (products, filters) => {
    let filtered = [...products];

    // Apply search query
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.category !== "all") {
      filtered = filtered.filter((product) => product.category === filters.category);
    }

    // Apply price range filter
    filtered = filtered.filter((product) =>
      product.price >= filters.priceRange.min &&
      product.price <= filters.priceRange.max
    );

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((product) =>
        (product.rating?.rate || 0) >= filters.rating
      );
    }

    // Apply in-stock filter
    if (filters.inStockOnly) {
      // Since we don't have stock data, we'll assume all products are in stock
      // In a real app, you'd check product.stock > 0
      filtered = filtered;
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      case "newest":
        // Assuming products have an ID that increases with time
        filtered.sort((a, b) => b.id - a.id);
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // featured - keep original order
        break;
    }

    return filtered;
  }
);

// Get available categories
export const selectAvailableCategories = createSelector(
  [(state) => state.product.data],
  (products) => {
    const categories = new Set(products.map((product) => product.category));
    return ["all", ...Array.from(categories).sort()];
  }
);

// Get price range for filters
export const selectPriceRange = createSelector(
  [(state) => state.product.data],
  (products) => {
    if (products.length === 0) return { min: 0, max: 1000 };

    const prices = products.map((product) => product.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }
);

export default searchFiltersSlice.reducer;
