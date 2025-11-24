import { createSlice } from "@reduxjs/toolkit";

// Mock data for initial reviews
const initialReviews = {
  1: [
    {
      id: "rev_1_1",
      productId: 1,
      userId: "user_1",
      userName: "Sarah Johnson",
      userAvatar: null,
      rating: 5,
      title: "Amazing quality and fast shipping!",
      comment: "I absolutely love this product! The quality is outstanding and it arrived much faster than expected. The customer service was also excellent when I had questions about sizing.",
      date: "2024-11-20T10:30:00Z",
      verified: true,
      helpful: 12,
      images: []
    },
    {
      id: "rev_1_2",
      productId: 1,
      userId: "user_2",
      userName: "Mike Chen",
      userAvatar: null,
      rating: 4,
      title: "Great product, minor issues",
      comment: "Overall very satisfied with the purchase. The item looks exactly like the photos and works perfectly. Only minor complaint is that the packaging could be better.",
      date: "2024-11-18T14:20:00Z",
      verified: true,
      helpful: 8,
      images: []
    },
    {
      id: "rev_1_3",
      productId: 1,
      userId: "user_3",
      userName: "Emma Wilson",
      userAvatar: null,
      rating: 5,
      title: "Perfect for what I needed",
      comment: "This exceeded my expectations! The build quality is excellent and it's very comfortable to use. I've already recommended it to several friends.",
      date: "2024-11-15T09:15:00Z",
      verified: false,
      helpful: 6,
      images: []
    }
  ],
  2: [
    {
      id: "rev_2_1",
      productId: 2,
      userId: "user_4",
      userName: "Alex Rodriguez",
      userAvatar: null,
      rating: 4,
      title: "Good value for money",
      comment: "Solid product that performs as advertised. The price point makes it very attractive. Would buy again.",
      date: "2024-11-22T16:45:00Z",
      verified: true,
      helpful: 5,
      images: []
    }
  ]
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: initialReviews,
    loading: false,
    error: null
  },
  reducers: {
    addReview: (state, action) => {
      const { productId, review } = action.payload;
      if (!state.reviews[productId]) {
        state.reviews[productId] = [];
      }
      const newReview = {
        id: `rev_${productId}_${Date.now()}`,
        productId,
        ...review,
        date: new Date().toISOString(),
        helpful: 0,
        images: review.images || []
      };
      state.reviews[productId].unshift(newReview); // Add to beginning of array
    },
    updateReview: (state, action) => {
      const { productId, reviewId, updates } = action.payload;
      const reviewIndex = state.reviews[productId]?.findIndex(r => r.id === reviewId);
      if (reviewIndex !== undefined && reviewIndex >= 0) {
        state.reviews[productId][reviewIndex] = {
          ...state.reviews[productId][reviewIndex],
          ...updates
        };
      }
    },
    deleteReview: (state, action) => {
      const { productId, reviewId } = action.payload;
      if (state.reviews[productId]) {
        state.reviews[productId] = state.reviews[productId].filter(r => r.id !== reviewId);
      }
    },
    markHelpful: (state, action) => {
      const { productId, reviewId } = action.payload;
      const review = state.reviews[productId]?.find(r => r.id === reviewId);
      if (review) {
        review.helpful += 1;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
});

export const {
  addReview,
  updateReview,
  deleteReview,
  markHelpful,
  setLoading,
  setError
} = reviewsSlice.actions;

export default reviewsSlice.reducer;

// Selectors
export const selectReviewsByProduct = (state, productId) => {
  return state.reviews.reviews[productId] || [];
};

export const selectAverageRating = (state, productId) => {
  const reviews = selectReviewsByProduct(state, productId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
};

export const selectRatingDistribution = (state, productId) => {
  const reviews = selectReviewsByProduct(state, productId);
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reviews.forEach(review => {
    distribution[review.rating] = (distribution[review.rating] || 0) + 1;
  });
  return distribution;
};
