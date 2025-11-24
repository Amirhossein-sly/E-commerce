import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProduct } from "../slices/ProductSlice";
import { add, updateQuantity } from "../slices/cartSlice";
import { pushToast } from "../slices/notificationsSlice";
import ProductCard from "../components/ProductCard";

export default function CategoryPage() {
  const dispatch = useDispatch();
  const { categoryName } = useParams();
  const { data, status } = useSelector((state) => state.product);
  const query = useSelector((state) => state.search.query.toLowerCase());
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (data.length === 0 && status !== "LOADING") {
      dispatch(fetchProduct());
    }
  }, [dispatch, data.length, status]);

  // فیلتر کردن محصولات بر اساس دسته‌بندی و جستجو
  const filteredData = data.filter((item) => {
    const matchesCategory = item.category === categoryName;
    const matchesSearch = item.title.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const getQuantity = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  if (status === "LOADING") {
    return (
      <div className="pt-[100px] pb-24">
        <h2 className="text-center mt-20 text-lg animate-pulse text-gray-600 dark:text-gray-400">Loading...</h2>
      </div>
    );
  }

  if (status === "ERROR") {
    return (
      <div className="pt-[100px] pb-24">
        <h2 className="text-center mt-20 text-red-500 dark:text-red-400">Error loading products</h2>
      </div>
    );
  }

  const categoryTitle = categoryName
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    : "";

  return (
    <div className="max-w-7xl mx-auto px-6 pt-[100px] pb-24">
      {/* عنوان دسته‌بندی */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {categoryTitle}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {filteredData.length} {filteredData.length === 1 ? "product" : "products"} found
        </p>
      </div>

      {/* Products Grid */}
      {filteredData.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-4">No products found in this category</h2>
          <Link
            to="/"
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 underline"
          >
            Go back to home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredData.map((item, index) => {
            const quantity = getQuantity(item.id);

            return (
              <ProductCard
                key={item.id}
                product={item}
                quantity={quantity}
                animationDelay={index * 100}
                onAdd={() => {
                  dispatch(add(item));
                  dispatch(
                    pushToast({
                      message: `${item.title} added to cart`,
                      type: "success",
                    })
                  );
                }}
                onIncrease={() => {
                  dispatch(updateQuantity({ id: item.id, change: 1 }));
                  dispatch(
                    pushToast({
                      message: `+1 ${item.title}`,
                      type: "info",
                    })
                  );
                }}
                onDecrease={() => {
                  dispatch(updateQuantity({ id: item.id, change: -1 }));
                  dispatch(
                    pushToast({
                      message: `-1 ${item.title}`,
                      type: "warning",
                    })
                  );
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

