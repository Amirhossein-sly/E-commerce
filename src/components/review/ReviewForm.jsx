import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview, setError } from "../../slices/reviewsSlice";
import { pushToast } from "../../slices/notificationsSlice";
import StarRating from "./StarRating";

export default function ReviewForm({ productId, onClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.isAuthenticated) {
      dispatch(pushToast({
        message: "Please log in to write a review",
        type: "error",
      }));
      return;
    }

    if (rating === 0) {
      dispatch(setError("Please select a rating"));
      dispatch(pushToast({
        message: "Please select a rating",
        type: "error",
      }));
      return;
    }

    if (!comment.trim()) {
      dispatch(setError("Please write a review comment"));
      dispatch(pushToast({
        message: "Please write a review comment",
        type: "error",
      }));
      return;
    }

    setIsSubmitting(true);

    try {
      const review = {
        userId: user.user.id,
        userName: user.user.name || user.user.firstName + " " + user.user.lastName,
        userAvatar: user.user.avatar || null,
        rating,
        title: title.trim(),
        comment: comment.trim(),
        verified: true, // Assuming logged-in users have verified purchases
        images: [] // Can be extended to support image uploads
      };

      dispatch(addReview({ productId, review }));

      dispatch(pushToast({
        message: "Review submitted successfully!",
        type: "success",
      }));

      // Reset form
      setRating(0);
      setTitle("");
      setComment("");

      if (onClose) onClose();
    } catch (error) {
      dispatch(setError("Failed to submit review"));
      dispatch(pushToast({
        message: "Failed to submit review. Please try again.",
        type: "error",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user.isAuthenticated) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔒</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Login Required
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Please log in to write a review for this product.
          </p>
          <a
            href="/login"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
          >
            Log In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center">
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">★</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Write a Review
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Overall Rating *
          </label>
          <StarRating
            rating={rating}
            onRatingChange={setRating}
            interactive={true}
            size={24}
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Review Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your experience..."
            className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            maxLength={100}
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {title.length}/100 characters
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Review *
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this product..."
            rows={5}
            className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 resize-none"
            maxLength={1000}
            required
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {comment.length}/1000 characters
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
