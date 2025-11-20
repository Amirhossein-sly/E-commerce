import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Home, Boxes, Sparkles } from "lucide-react";
import CartIcon from "./CartIcon";
import SearchBar from "./SearchBar";
import CategoryDropdown from "./CategoryDropdown";
import AccountDropdown from "./AccountDropdown";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Products", path: "/products", icon: Boxes },
    { name: "What's New", path: "/whats-new", icon: Sparkles },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-md z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* لوگو */}
        <Link to="/" className="text-2xl md:text-3xl font-extrabold text-gray-900 hover:text-gray-700 transition">
          🛍️ MyStore
        </Link>

        {/* منو دسکتاپ */}
        <div className="hidden md:flex items-center gap-6 font-medium text-gray-700">
          <CategoryDropdown />
          {navLinks.map(({ name, path, icon: Icon }) => (
            <Link
              key={name}
              to={path}
              className="p-2 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 transition-colors duration-200"
              aria-label={name}
            >
              <Icon size={20} />
            </Link>
          ))}
          <AccountDropdown />
          <SearchBar />
          <CartIcon />
        </div>

        {/* منو موبایل */}
        <div className="md:hidden flex items-center gap-4">
          <CartIcon />
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && <MobileMenu navLinks={navLinks} closeMenu={() => setMobileMenuOpen(false)} />}
    </nav>
  );
}
