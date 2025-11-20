import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProduct } from "../slices/ProductSlice";
import { add, updateQuantity } from "../slices/cartSlice";
import HeroBanner from "../components/HeroBanner";
import ProductCard from "../components/ProductCard";

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
      <h2 className="text-center mt-20 text-lg animate-pulse">Loading...</h2>
    );
  }

  if (status === "ERROR") {
    return (
      <h2 className="text-center mt-20 text-red-500">Error loading products</h2>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pt-[100px]">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
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
