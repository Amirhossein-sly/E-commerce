import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import ProductsHeader from "../components/product/ProductsHeader";
import ProductsFilters from "../components/product/ProductsFilters";
import ProductsEmptyState from "../components/product/ProductsEmptyState";
import { fetchProduct } from "../slices/ProductSlice";
import { add, updateQuantity } from "../slices/cartSlice";
import { pushToast } from "../slices/notificationsSlice";
import {
  resetFilters,
  setCategory,
  setSortBy,
} from "../slices/productFiltersSlice";

export default function Products() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.product);
  const query = useSelector((state) => state.search.query.toLowerCase());
  const cart = useSelector((state) => state.cart);
  const { selectedCategory, sortBy } = useSelector((state) => state.productFilters);

  useEffect(() => {
    if (data.length === 0 && status !== "LOADING") {
      dispatch(fetchProduct());
    }
  }, [dispatch, data.length, status]);

  const categories = useMemo(() => {
    const unique = new Set(data.map((item) => item.category));
    return ["all", ...unique];
  }, [data]);

  const filteredProducts = useMemo(() => {
    return data.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [data, selectedCategory, query]);

  const sortedProducts = useMemo(() => {
    const copy = [...filteredProducts];
    switch (sortBy) {
      case "price-asc":
        return copy.sort((a, b) => a.price - b.price);
      case "price-desc":
        return copy.sort((a, b) => b.price - a.price);
      case "alpha":
        return copy.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return copy;
    }
  }, [filteredProducts, sortBy]);

  const getQuantity = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  if (status === "LOADING" && data.length === 0) {
    return (
      <h2 className="text-center mt-20 text-lg animate-pulse text-gray-600 dark:text-gray-400">Loading...</h2>
    );
  }

  if (status === "ERROR") {
    return (
      <h2 className="text-center mt-20 text-red-500 dark:text-red-400">Error loading products</h2>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pt-[120px] pb-24">
      <ProductsHeader totalCount={data.length} visibleCount={sortedProducts.length} />

      <ProductsFilters
        categories={categories}
        selectedCategory={selectedCategory}
        sortBy={sortBy}
        onCategoryChange={(value) => dispatch(setCategory(value))}
        onSortChange={(value) => dispatch(setSortBy(value))}
        visibleCount={sortedProducts.length}
        totalCount={data.length}
      />

      {sortedProducts.length === 0 ? (
        <ProductsEmptyState onReset={() => dispatch(resetFilters())} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sortedProducts.map((item, index) => {
            const quantity = getQuantity(item.id);

            return (
              <ProductCard
                key={item.id}
                product={item}
                quantity={quantity}
                animationDelay={index * 80}
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

