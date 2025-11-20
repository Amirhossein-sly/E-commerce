import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../slices/cartSlice";
import { fetchProduct } from "../slices/ProductSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // گرفتن داده از Redux
  const { data, status } = useSelector((state) => state.product);

  // محصول فعلی
  const product = data.find((p) => p.id === parseInt(id));

  // اگه محصولات هنوز لود نشدن، برو بگیرشون
  useEffect(() => {
    if (data.length === 0 && status !== "LOADING") {
      dispatch(fetchProduct());
    }
  }, [data, status, dispatch]);

  if (status === "LOADING" || !product) {
    return <h2 className="text-center mt-20 text-lg">Loading...</h2>;
  }

  // محصولات مشابه
  const related = data
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  return (
    <div className="flex flex-col mt-16 gap-12">
      {/* بخش اصلی */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* تصویر */}
        <div className="flex-1 flex justify-center items-center bg-gray-100 rounded-2xl p-8">
          <img
            src={product.image}
            alt={product.title}
            className="w-80 h-80 object-contain"
          />
        </div>

        {/* توضیحات */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.title}
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-8">
            <p className="text-2xl font-semibold text-gray-900">
              ${product.price}
            </p>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium">
              In Stock
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch(add(product))}
              className="bg-black text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all"
            >
              Add to Cart
            </button>

            <button className="border border-gray-300 text-gray-800 px-8 py-3 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* محصولات مشابه */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {related.map((item) => (
            <Link
              to={`/product/${item.id}`}
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-32 h-32 object-contain mb-4"
              />
              <h3 className="text-lg font-medium text-center">{item.title}</h3>
              <p className="text-gray-800 font-semibold mt-2">${item.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
