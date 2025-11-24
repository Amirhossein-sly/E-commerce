import { Star } from "lucide-react";

export default function StarRating({ rating, onRatingChange, interactive = false, size = 16 }) {
  const handleClick = (value) => {
    if (interactive && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          disabled={!interactive}
          className={`${
            interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"
          } disabled:cursor-default`}
        >
          <Star
            size={size}
            className={`${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"
            } ${
              interactive ? "hover:fill-yellow-400 hover:text-yellow-400" : ""
            } transition-colors`}
          />
        </button>
      ))}
      {rating > 0 && (
        <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

// Component for displaying rating distribution
export function RatingDistribution({ distribution, totalReviews }) {
  const percentages = Object.entries(distribution).map(([rating, count]) => ({
    rating: parseInt(rating),
    count,
    percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0
  })).reverse(); // Reverse to show 5 stars first

  return (
    <div className="space-y-2">
      {percentages.map(({ rating, count, percentage }) => (
        <div key={rating} className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1 w-12">
            <span className="font-medium">{rating}</span>
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
          </div>
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-gray-600 dark:text-gray-400 w-8 text-right">
            {count}
          </span>
        </div>
      ))}
    </div>
  );
}
