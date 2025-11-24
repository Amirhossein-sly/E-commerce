import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function CategoryDropdown() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const handleToggle = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && !event.target.closest('.category-dropdown')) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative category-dropdown">
      <button
        onClick={handleToggle}
        className="flex items-center gap-1 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition"
      >
        Category <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 rounded-lg p-2 flex flex-col gap-1 z-50 border border-gray-200 dark:border-gray-700">
          {categories.map(cat => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-2 py-1 transition block"
              onClick={handleClose}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
