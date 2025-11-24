import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Home, Boxes, Sparkles } from "lucide-react";
import CartIcon from "../icon/CartIcon";
import WishlistIcon from "../icon/WishlistIcon";
import ThemeToggle from "../ui/ThemeToggle";
import SearchBar from "../search/SearchBar";
import CategoryDropdown from "../dropdown/CategoryDropdown";
import AccountDropdown from "../dropdown/AccountDropdown";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Products", path: "/products", icon: Boxes },
    { name: "What's New", path: "/whats-new", icon: Sparkles },
  ];

  const handleCloseMenu = () => {
    setIsAnimating(true);
    // Wait for animation to complete before hiding menu
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsAnimating(false);
    }, 300); // Match animation duration
  };

  const handleToggleMenu = () => {
    if (mobileMenuOpen) {
      handleCloseMenu();
    } else {
      setMobileMenuOpen(true);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md dark:shadow-gray-900/50 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* لوگو */}
        <Link to="/" className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition">
          🛍️ MyStore
        </Link>

        {/* منو دسکتاپ */}
        <div className="hidden md:flex items-center gap-6 font-medium text-gray-700 dark:text-gray-300">
          <CategoryDropdown />
          {navLinks.map(({ name, path, icon: Icon }) => (
            <Link
              key={name}
              to={path}
              className="relative group p-2 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={name}
            >
              <Icon size={20} />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {name}
              </div>
            </Link>
          ))}
          <div className="relative group">
            <AccountDropdown />
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Account
            </div>
          </div>
          <div className="relative group">
            <SearchBar />
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Search
            </div>
          </div>
          <div className="relative group">
            <ThemeToggle />
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Theme
            </div>
          </div>
          <div className="relative group">
            <WishlistIcon />
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Wishlist
            </div>
          </div>
          <div className="relative group">
            <CartIcon />
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Cart
            </div>
          </div>
        </div>

        {/* منو موبایل */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <WishlistIcon />
          <CartIcon />
          <button
            onClick={handleToggleMenu}
            className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Toggle mobile menu"
          >
            <div className="transition-transform duration-300 ease-out">
              {mobileMenuOpen ? (
                <X size={24} className="text-red-500 dark:text-red-400" />
              ) : (
                <Menu size={24} />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
            onClick={handleCloseMenu}
          />
          {/* Menu */}
          <div className="relative z-50 md:hidden">
            <MobileMenu
              navLinks={navLinks}
              closeMenu={handleCloseMenu}
              isAnimating={isAnimating}
              isOpen={mobileMenuOpen}
            />
          </div>
        </>
      )}
    </nav>
  );
}
