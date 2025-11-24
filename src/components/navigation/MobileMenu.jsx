import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useEffect, useState } from "react";
import SearchBar from "../search/SearchBar";
import CategoryDropdown from "../dropdown/CategoryDropdown";
import AccountDropdown from "../dropdown/AccountDropdown";

export default function MobileMenu({ navLinks, closeMenu, isAnimating = false, isOpen = false }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isOpen && !isAnimating) {
      setAnimationClass('animate-slideDown');
    } else if (isAnimating) {
      setAnimationClass('animate-slideUp');
    } else {
      setAnimationClass('');
    }
  }, [isOpen, isAnimating]);

  return (
    <div className={`md:hidden bg-white dark:bg-gray-900 shadow-md px-6 py-4 space-y-4 flex flex-col ${animationClass}`}>
      <CategoryDropdown />

      {navLinks.map(({ name, path, icon: Icon }) => (
        <Link
          key={name}
          to={path}
          className="flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white font-medium transition-colors duration-200"
          onClick={closeMenu}
        >
          {Icon && <Icon size={18} className="text-gray-600 dark:text-gray-300 flex-shrink-0" />}
          <span>{name}</span>
        </Link>
      ))}

      <AccountDropdown />
      <SearchBar />

      <div className="flex justify-center items-center pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className="p-3 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 transition-all duration-200"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
}
