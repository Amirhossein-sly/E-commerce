import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: "all",
  sortBy: "featured",
};

const productFiltersSlice = createSlice({
  name: "productFilters",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setCategory, setSortBy, resetFilters } = productFiltersSlice.actions;
export default productFiltersSlice.reducer;

