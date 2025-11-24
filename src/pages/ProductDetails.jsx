import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../slices/ProductSlice";
import ProductDetailSkeleton from "../components/skeleton/ProductDetailSkeleton";
import ProductInfo from "../components/product/ProductInfo";
import ProductSpecs from "../components/product/ProductSpecs";
import ProductActions from "../components/product/ProductActions";
import RelatedProducts from "../components/product/RelatedProducts";
import ReviewsList from "../components/review/ReviewsList";
import ImageModal from "../components/ui/ImageModal";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // گرفتن داده از Redux
  const { data, status } = useSelector((state) => state.product);
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);

  // محصول فعلی
  const product = data.find((p) => p.id === parseInt(id));

  // بررسی وجود محصول در سبد خرید
  const cartItem = cart.find((item) => item.id === parseInt(id));
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // بررسی وجود محصول در wishlist
  const isInWishlist = wishlist.some((item) => item.id === parseInt(id));


  // اگه محصولات هنوز لود نشدن، برو بگیرشون
  useEffect(() => {
    if (data.length === 0 && status !== "LOADING") {
      dispatch(fetchProduct());
    }
  }, [data, status, dispatch]);

  if (status === "LOADING" || !product) {
    return <ProductDetailSkeleton />;
  }

  if (status === "ERROR") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="text-center bg-white dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-gray-900/50 py-16 px-6 space-y-6 max-w-md">
          <div className="text-6xl">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Product not found
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            We couldn't find the product you're looking for. It might have been removed or the link might be incorrect.
          </p>
          <Link
            to="/products"
            className="inline-block px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  // محصولات مشابه
  const related = data
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pt-[120px] pb-24 max-w-7xl mx-auto px-4 lg:px-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-indigo-600 transition-colors">Products</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`} className="hover:text-indigo-600 transition-colors capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate">{product.title.slice(0, 30)}...</span>
      </nav>

      {/* بخش اصلی */}
      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        {/* تصویر */}
        <div className="lg:flex-1">
          <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-gray-900/50 p-8">
            <div className="relative group">
              <img
                src={product.image}
                alt={product.title}
                className="w-full max-w-md mx-auto h-96 object-contain rounded-2xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition duration-300 rounded-2xl" />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setIsImageModalOpen(true)}
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all duration-200 hover:scale-110"
                  aria-label="Zoom image"
                >
                  🔍
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* اطلاعات محصول */}
        <div className="lg:flex-1">
          <ProductInfo product={product} />

          <ProductSpecs product={product} />


          <ProductActions
            product={product}
            productId={parseInt(id)}
            quantityInCart={quantityInCart}
            isInWishlist={isInWishlist}
          />
        </div>
      </div>

      {/* نظرات مشتریان */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-16 mt-16">
        <ReviewsList productId={parseInt(id)} />
      </div>

      <RelatedProducts
        products={data}
        currentProductId={id}
      />

      {/* Image Modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageSrc={product?.image}
        imageAlt={product?.title}
      />
    </div>
  );
}
