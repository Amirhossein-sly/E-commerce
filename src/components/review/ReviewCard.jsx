import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThumbsUp, User, Calendar, ShieldCheck } from "lucide-react";
import { markHelpful } from "../../slices/reviewsSlice";
import { pushToast } from "../../slices/notificationsSlice";
import StarRating from "./StarRating";

export default function ReviewCard({ review, productId }) {
  const dispatch = useDispatch();
  const [hasVoted, setHasVoted] = useState(false);

  const handleHelpfulClick = () => {
    if (!hasVoted) {
      dispatch(markHelpful({ productId, reviewId: review.id }));
      setHasVoted(true);
      dispatch(pushToast({
        message: "Thanks for your feedback!",
        type: "success",
      }));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            {review.userAvatar ? (
              <img
                src={review.userAvatar}
                alt={review.userName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User size={20} className="text-gray-500 dark:text-gray-400" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {review.userName}
              </h4>
              {review.verified && (
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <ShieldCheck size={14} />
                  <span className="text-xs font-medium">Verified Purchase</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={review.rating} size={14} />
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                <Calendar size={12} />
                {formatDate(review.date)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Content */}
      <div className="space-y-3">
        {review.title && (
          <h5 className="font-semibold text-gray-900 dark:text-white text-lg">
            {review.title}
          </h5>
        )}

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {review.comment}
        </p>

        {/* Review Images */}
        {review.images && review.images.length > 0 && (
          <div className="flex gap-2 mt-3">
            {review.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Review image ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={handleHelpfulClick}
          disabled={hasVoted}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            hasVoted
              ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 cursor-default"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <ThumbsUp size={14} />
          Helpful ({review.helpful})
        </button>

        {hasVoted && (
          <span className="text-xs text-green-600 dark:text-green-400 font-medium">
            ✓ Thanks for your feedback!
          </span>
        )}
      </div>
    </div>
  );
}
