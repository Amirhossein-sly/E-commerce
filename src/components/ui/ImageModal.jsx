import { useEffect } from "react";
import { X } from "lucide-react";

export default function ImageModal({ isOpen, onClose, imageSrc, imageAlt }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-10 text-white hover:text-gray-300 transition-colors bg-black/20 backdrop-blur-sm rounded-full p-2"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Image */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-contain rounded-lg shadow-2xl"
          style={{ maxHeight: "90vh" }}
        />

        {/* Overlay for better UX */}
        <div className="absolute inset-0 -z-10 bg-black bg-opacity-50 rounded-lg" />
      </div>
    </div>
  );
}
