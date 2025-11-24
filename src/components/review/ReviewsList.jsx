import { useState } from "react";
import { useSelector } from "react-redux";
import { MessageSquare, Plus, ChevronDown, ChevronUp } from "lucide-react";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import StarRating, { RatingDistribution } from "./StarRating";

export default function ReviewsList({ productId }) {
  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [showAll, setShowAll] = useState(false);

  const reviews = useSelector((state) =>
    state.reviews.reviews[productId] || []
  );

  const averageRating = useSelector((state) =>
    state.reviews.reviews[productId]
      ? state.reviews.reviews[productId].reduce((sum, review) => sum + review.rating, 0) / state.reviews.reviews[productId].length
      : 0
  );

  const ratingDistribution = useSelector((state) => {
    const productReviews = state.reviews.reviews[productId] || [];
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    productReviews.forEach(review => {
      distribution[review.rating] = (distribution[review.rating] || 0) + 1;
    });
    return distribution;
  });

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date) - new Date(a.date);
      case "oldest":
        return new Date(a.date) - new Date(b.date);
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      case "helpful":
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const displayedReviews = showAll ? sortedReviews : sortedReviews.slice(0, 3);
  const hasMoreReviews = sortedReviews.length > 3;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <MessageSquare className="text-indigo-600" size={24} />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Customer Reviews ({reviews.length})
        </h2>
      </div>

      {/* Rating Overview */}
      {reviews.length > 0 && (
        <div className="grid md:grid-cols-2 gap-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {averageRating.toFixed(1)}
            </div>
            <StarRating rating={averageRating} size={20} />
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Rating Distribution
            </h4>
            <RatingDistribution
              distribution={ratingDistribution}
              totalReviews={reviews.length}
            />
          </div>
        </div>
      )}

      {/* Write Review Button */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-colors font-medium"
        >
          <Plus size={18} />
          Write a Review
        </button>

        {/* Sort Dropdown */}
        {reviews.length > 1 && (
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
            <option value="helpful">Most Helpful</option>
          </select>
        )}
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="animate-fade-in">
          <ReviewForm
            productId={productId}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
          <MessageSquare size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Reviews Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Be the first to share your thoughts about this product!
          </p>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-colors font-medium"
            >
              Write the First Review
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {displayedReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              productId={productId}
            />
          ))}

          {/* Show More/Less Button */}
          {hasMoreReviews && (
            <div className="text-center pt-6">
              <button
                onClick={() => setShowAll(!showAll)}
                className="flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors mx-auto"
              >
                {showAll ? (
                  <>
                    <ChevronUp size={18} />
                    Show Less Reviews
                  </>
                ) : (
                  <>
                    <ChevronDown size={18} />
                    Show More Reviews ({sortedReviews.length - 3} remaining)
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
