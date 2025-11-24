import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProduct } from "../slices/ProductSlice";
import { add, updateQuantity } from "../slices/cartSlice";
import HeroBanner from "../components/layout/HeroBanner";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/skeleton/ProductSkeleton";

export default function Home() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.product);
  const query = useSelector((state) => state.search.query.toLowerCase());
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(query)
  );

  const getQuantity = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  if (status === "LOADING") {
    return (
      <div className="max-w-7xl mx-auto px-6 pt-[100px]">
        {/* Hero Banner Skeleton */}
        <div className="bg-gray-200 rounded-3xl h-96 mb-16 animate-pulse"></div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }, (_, index) => (
            <ProductSkeleton key={index} animationDelay={index * 100} />
          ))}
        </div>
      </div>
    );
  }

  if (status === "ERROR") {
    return (
      <div className="max-w-7xl mx-auto px-6 pt-[100px]">
        <div className="text-center bg-white dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-gray-900/50 py-16 px-6 space-y-6">
          <div className="text-6xl">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            We couldn't load the products right now. Please check your internet connection and try again.
          </p>
          <button
            onClick={() => dispatch(fetchProduct())}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pt-[100px] pb-24">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredData.map((item, index) => {
          const quantity = getQuantity(item.id);

          return (
            <ProductCard
              key={item.id}
              product={item}
              quantity={quantity}
              animationDelay={index * 100}
              onAdd={() => dispatch(add(item))}
              onIncrease={() =>
                dispatch(updateQuantity({ id: item.id, change: 1 }))
              }
              onDecrease={() =>
                dispatch(updateQuantity({ id: item.id, change: -1 }))
              }
            />
          );
        })}
      </div>
    </div>
  );
}
