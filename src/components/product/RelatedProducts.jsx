import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add, updateQuantity } from "../../slices/cartSlice";
import ProductCard from "../ProductCard";

export default function RelatedProducts({ products, currentProductId }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // Filter out current product and limit to 4 items
  const relatedProducts = products
    .filter(product => product.id !== parseInt(currentProductId))
    .slice(0, 4);

  const getQuantity = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Related Products</h2>
        <Link
          to={`/category/${relatedProducts[0]?.category}`}
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium flex items-center gap-2"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {relatedProducts.map((product, index) => {
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
    </div>
  );
}
