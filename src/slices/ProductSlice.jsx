import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProduct = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("Failed to fetch products");
    const data = await response.json();
    return data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "SUCCESS";
        state.data = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "ERROR";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
