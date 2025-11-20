import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({
  product,
  quantity = 0,
  animationDelay = 0,
  onAdd,
  onIncrease,
  onDecrease,
}) {
  const [clickAnim, setClickAnim] = useState({ plus: false, minus: false });

  if (!product) return null;

  const triggerAnimation = (type) => {
    setClickAnim((prev) => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setClickAnim((prev) => ({ ...prev, [type]: false }));
    }, 150);
  };

  const handleIncrease = () => {
    if (!onIncrease) return;
    onIncrease();
    triggerAnimation("plus");
  };

  const handleDecrease = () => {
    if (!onDecrease) return;
    onDecrease();
    triggerAnimation("minus");
  };

  return (
    <div
      style={{ animationDelay: `${animationDelay}ms` }}
      className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden flex flex-col opacity-0 animate-fadeIn"
    >
      <Link to={`/product/${product.id}`} className="relative group">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-72 object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-15 transition duration-300 rounded-3xl" />
      </Link>

      <div className="flex flex-col flex-grow p-6">
        <p className="font-semibold text-gray-800 text-lg line-clamp-2 mb-1 tracking-wide">
          {product.title}
        </p>
        <p className="text-gray-500 text-sm flex-grow">
          {product.category
            ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
            : ""}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>

          {quantity === 0 ? (
            <button
              onClick={onAdd}
              className="bg-gray-900 text-white px-5 py-2 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-800 transition-all"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrease}
                className={`bg-gray-200 text-gray-800 px-3 py-1 rounded-lg shadow-sm transition-transform duration-150 ${
                  clickAnim.minus ? "scale-110" : ""
                }`}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-2">{quantity}</span>
              <button
                onClick={handleIncrease}
                className={`bg-gray-200 text-gray-800 px-3 py-1 rounded-lg shadow-sm transition-transform duration-150 ${
                  clickAnim.plus ? "scale-110" : ""
                }`}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

