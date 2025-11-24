import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { add, updateQuantity } from "../../slices/cartSlice";

export default function NewArrivals() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.product.data);

  // Get latest products (assuming higher ID = newer)
  const newArrivals = products?.slice(-8) || [];

  const getQuantity = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  if (!products || products.length === 0 || newArrivals.length === 0) {
    return (
      <section className="mb-16">
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No new arrivals available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          ✨ New Arrivals
        </h2>
        <Link
          to="/products"
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium flex items-center gap-2"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {newArrivals.map((product, index) => {
          const quantity = getQuantity(product.id);

          return (
            <ProductCard
              key={product.id}
              product={product}
              quantity={quantity}
              animationDelay={index * 100}
              onAdd={() => dispatch(add(product))}
              onIncrease={() =>
                dispatch(updateQuantity({ id: product.id, change: 1 }))
              }
              onDecrease={() =>
                dispatch(updateQuantity({ id: product.id, change: -1 }))
              }
            />
          );
        })}
      </div>
    </section>
  );
}
