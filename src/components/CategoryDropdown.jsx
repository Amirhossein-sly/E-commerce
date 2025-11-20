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

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1 hover:text-black transition">
        Category <ChevronDown size={16} />
      </button>
      {open && (
        <div className="absolute mt-2 w-40 bg-white shadow-lg rounded-lg p-2 flex flex-col gap-1 z-50">
          {categories.map(cat => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className="hover:bg-gray-100 rounded px-2 py-1 transition"
              onClick={() => setOpen(false)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
