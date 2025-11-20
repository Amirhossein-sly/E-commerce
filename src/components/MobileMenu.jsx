import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import CategoryDropdown from "./CategoryDropdown";
import AccountDropdown from "./AccountDropdown";

export default function MobileMenu({ navLinks, closeMenu }) {
  return (
    <div className="md:hidden bg-white/95 backdrop-blur-md shadow-md px-6 py-4 space-y-4 flex flex-col">
      <CategoryDropdown />
      {navLinks.map(({ name, path, icon: Icon }) => (
        <Link
          key={name}
          to={path}
          className="flex items-center gap-3 hover:text-black font-medium transition-colors"
          onClick={closeMenu}
        >
          {Icon && <Icon size={18} />}
          <span>{name}</span>
        </Link>
      ))}
      <AccountDropdown />
      <SearchBar />
    </div>
  );
}
