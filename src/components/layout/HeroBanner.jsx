import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export default function HeroBanner() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-3xl p-8 lg:p-12 mb-12 shadow-xl">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-6">
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
            Discover Amazing Products
          </h1>

          <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
            Explore our curated collection of trending products with unbeatable deals and exceptional quality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-lg"
            >
              <ShoppingBag size={20} />
              Shop Now
            </Link>

            <Link
              to="/whats-new"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
            >
              Explore New
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
