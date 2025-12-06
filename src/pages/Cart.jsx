import { useSelector } from "react-redux";
import EmptyCartState from "../components/cart/EmptyCartState";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import CouponSection from "../components/cart/CouponSection";

export default function Cart() {
  const cartproducts = useSelector((state) => state.cart);
  const isCartEmpty = cartproducts.length === 0;

  return (
    <div className="pt-[120px] pb-24 max-w-7xl mx-auto px-6 lg:px-8">
      {isCartEmpty ? (
        <EmptyCartState />
      ) : (
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[2fr,1fr]">
          <section className="space-y-6">
            {cartproducts.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                quantity={product.quantity}
              />
            ))}
          </section>

          <aside className="space-y-6">
            <CartSummary />
            <CouponSection />
          </aside>
        </div>
      )}
    </div>
  );
}
