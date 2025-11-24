import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white border-t border-gray-800 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🛍️</span>
              <span className="text-xl font-bold">MyStore</span>
            </div>
            <p className="text-gray-300 dark:text-gray-400 text-sm leading-relaxed">
              Your ultimate destination for quality products. We offer curated collections
              with exceptional customer service and fast, reliable shipping.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors text-sm"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors text-sm"
              >
                Products
              </Link>
              <Link
                to="/categories"
                className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors text-sm"
              >
                Categories
              </Link>
              <Link
                to="/wishlist"
                className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors text-sm"
              >
                Wishlist
              </Link>
              <Link
                to="/cart"
                className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors text-sm"
              >
                Cart
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <div className="flex flex-col space-y-2">
              <span
                className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Contact Us
              </span>
              <span
                className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Shipping Info
              </span>
              <span
                className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Returns & Exchanges
              </span>
              <span
                className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                FAQ
              </span>
              <span
                className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Size Guide
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-gray-400 flex-shrink-0" />
                <span className="text-gray-300 dark:text-gray-400 text-sm">
                  Bldg. B, Unit 16, Neshat Residental Complex, No. 1, Del Azar St., Qom, Iran
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-gray-400 flex-shrink-0" />
                <span className="text-gray-300 dark:text-gray-400 text-sm">
                  +989113592670
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-gray-400 flex-shrink-0" />
                <span className="text-gray-300 dark:text-gray-400 text-sm">
                  amir.slv.dev@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 dark:border-gray-700 mt-12 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
            <p className="text-gray-300 dark:text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest products and exclusive deals.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 dark:bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              © {currentYear} MyStore. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <span
                className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Privacy Policy
              </span>
              <span
                className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Terms of Service
              </span>
              <span
                className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Cookie Policy
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
