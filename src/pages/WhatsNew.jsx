import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProduct } from "../slices/ProductSlice";
import LoadingState from "../components/whatsnew/LoadingState";
import ErrorState from "../components/whatsnew/ErrorState";
import FeaturedProducts from "../components/whatsnew/FeaturedProducts";
import NewArrivals from "../components/whatsnew/NewArrivals";

export default function WhatsNew() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.product);


  useEffect(() => {
    // Only fetch if we have no data at all and we're not already loading or succeeded
    if ((!data || data.length === 0) && status === "idle") {
      dispatch(fetchProduct());
    }
  }, [dispatch, data, status]);

  if (status === "LOADING" && (!data || data.length === 0)) {
    return <LoadingState />;
  }

  if (status === "ERROR") {
    return <ErrorState message={error} />;
  }

  if (!data || data.length === 0) {
    return <LoadingState />;
  }

  // If we have data and it's not empty, show the content
  if (data && data.length > 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 pt-[120px] pb-24">
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-10 shadow-xl flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="flex-1 space-y-4">
            <p className="uppercase tracking-[0.3em] text-sm font-semibold">
              Just In
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Discover What&apos;s New & Trending
            </h1>
            <p className="text-base text-indigo-100 max-w-xl">
              Curated selection of the freshest arrivals, from must-have gadgets
              to fashion-forward pieces. Updated daily from the Fake Store API.
            </p>
          </div>
          <div className="flex-1">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-3xl font-bold">
                  {data.length}
                </p>
                <p className="text-sm text-indigo-100">Total products</p>
              </div>
              <div>
                <p className="text-3xl font-bold">
                  4.5
                </p>
                <p className="text-sm text-indigo-100">Avg rating</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-indigo-100">
                  Powered by Tailwind CSS & Redux Toolkit
                </p>
              </div>
            </div>
          </div>
        </section>

        <FeaturedProducts />
        <NewArrivals />

        {/* Simple fallback list */}
        {data && data.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              All Products ({data.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.slice(0, 8).map((product) => (
                <div key={product.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-contain mb-4"
                  />
                  <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    ${product.price}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // If loading, show loading state
  if (status === "LOADING") {
    return <LoadingState />;
  }

  // If error, show error state
  if (status === "ERROR") {
    return <ErrorState message={error} />;
  }

  // Default fallback
  return <LoadingState />;
}

