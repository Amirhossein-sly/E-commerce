import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProduct } from "../slices/ProductSlice";
import { add, updateQuantity } from "../slices/cartSlice";
import { pushToast } from "../slices/notificationsSlice";

export default function WhatsNew() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.product);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (data.length === 0 && status !== "LOADING") {
      dispatch(fetchProduct());
    }
  }, [dispatch, data.length, status]);

  const featuredProducts = useMemo(() => {
    if (data.length === 0) return [];
    return [...data]
      .sort((a, b) => b.rating?.rate - a.rating?.rate || 0)
      .slice(0, 4);
  }, [data]);

  const newArrivals = useMemo(() => {
    if (data.length === 0) return [];
    return [...data].slice(-8);
  }, [data]);

  const getQuantity = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  if (status === "LOADING" && data.length === 0) {
    return (
      <h2 className="text-center mt-20 text-lg animate-pulse">Loading...</h2>
    );
  }

  if (status === "ERROR") {
    return (
      <h2 className="text-center mt-20 text-red-500">
        Error loading new arrivals
      </h2>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pt-[120px] pb-16 space-y-12">
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-10 shadow-xl flex flex-col md:flex-row items-center gap-8">
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
                {newArrivals.length}
              </p>
              <p className="text-sm text-indigo-100">New arrivals</p>
            </div>
            <div>
              <p className="text-3xl font-bold">
                {featuredProducts.length}
              </p>
              <p className="text-sm text-indigo-100">Featured picks</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-indigo-100">
                Powered by Tailwind CSS & Redux Toolkit
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Editor&apos;s Picks</h2>
          <p className="text-sm text-gray-500">Top rated products right now</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {featuredProducts.map((item, index) => (
            <ProductCard
              key={item.id}
              product={item}
              quantity={getQuantity(item.id)}
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
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Latest Drops</h2>
          <p className="text-sm text-gray-500">Fresh additions to the catalog</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {newArrivals.map((item, index) => (
            <ProductCard
              key={item.id}
              product={item}
              quantity={getQuantity(item.id)}
              animationDelay={index * 60}
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
          ))}
        </div>
      </section>
    </div>
  );
}

