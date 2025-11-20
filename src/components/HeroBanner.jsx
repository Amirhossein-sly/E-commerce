import { Link } from "react-router-dom";

export default function HeroBanner() {
  return (
    <div className="bg-indigo-600 text-white rounded-3xl p-8 mb-12 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex-1">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Discover Our Best Products
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Shop the latest trending products with amazing deals!
        </p>
        <Link
          to="/products"
          className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition"
        >
          Shop Now
        </Link>
      </div>
      <div className="flex-1">
        <img
          src="/banner-product.png"
          alt="Hero Banner"
          className="w-full h-64 object-contain"
        />
      </div>
    </div>
  );
}
