# 🛍️ MyStore - E-Commerce Platform

A modern, responsive e-commerce platform built with React, Redux Toolkit, and Tailwind CSS. This project showcases a complete shopping experience with cart management, product filtering, and user authentication features.

![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.9.2-purple.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.18-cyan.svg)
![Vite](https://img.shields.io/badge/Vite-7.1.7-yellow.svg)

## ✨ Features

### 🏠 Core Features
- **Product Catalog**: Browse products from [FakeStore API](https://fakestoreapi.com/)
- **Product Details**: Detailed product pages with full descriptions
- **Search & Filter**: Real-time search and category-based filtering
- **Shopping Cart**: Add, remove, and update cart items with persistence
- **Responsive Design**: Mobile-first approach with modern UI

### 🎯 Advanced Features
- **Local Storage**: Cart persistence across browser sessions
- **Toast Notifications**: Real-time feedback for user actions
- **Coupon System**: Discount codes (SAVE10, FREESHIP)
- **Checkout Preview**: Demo checkout flow for portfolio presentation
- **Loading States**: Skeleton loading and error handling
- **Smooth Animations**: CSS transitions and hover effects

### 🔧 Technical Features
- **Redux Toolkit**: Modern state management with slices
- **React Router**: Client-side routing with protected routes
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Beautiful, consistent iconography
- **ESLint**: Code quality and consistency
- **Vite**: Fast development and optimized builds

## 🚀 Live Demo

The application is running on [Vite Dev Server](http://localhost:5173) (or alternative port if 5173 is occupied).

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **State Management**: Redux Toolkit 2.9.2
- **Styling**: Tailwind CSS 3.4.18
- **Icons**: Lucide React 0.553.0
- **Routing**: React Router DOM 7.9.5
- **API**: FakeStore API

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Main navigation with search and cart
│   ├── ProductCard.jsx # Product display component
│   ├── CartIcon.jsx    # Cart icon with badge
│   └── ...
├── pages/              # Route components
│   ├── Home.jsx        # Landing page with hero and products
│   ├── Cart.jsx        # Shopping cart with checkout
│   ├── ProductDetails.jsx # Individual product view
│   └── ...
├── slices/             # Redux state slices
│   ├── cartSlice.jsx   # Cart state management
│   ├── productSlice.jsx # Product data fetching
│   ├── userSlice.jsx   # User authentication
│   └── ...
├── redux/
│   └── store.jsx       # Redux store configuration
└── assets/             # Static assets
```

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd e-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Modern dark/light theme with consistent colors
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Components**: Reusable, accessible UI components

### User Experience
- **Loading States**: Skeleton screens during data fetching
- **Error Handling**: User-friendly error messages
- **Responsive**: Optimized for mobile, tablet, and desktop
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Optimized images and lazy loading

## 🛒 Cart Features

- **Persistent Storage**: Cart items saved in localStorage
- **Quantity Management**: Increase/decrease item quantities
- **Item Removal**: Remove individual items or clear entire cart
- **Price Calculation**: Automatic subtotal, tax, and shipping calculation
- **Coupon System**:
  - `SAVE10`: 10% off subtotal (minimum $50)
  - `FREESHIP`: Free shipping on any order
- **Checkout Preview**: Demo checkout modal with order summary

## 🔍 Search & Filter

- **Real-time Search**: Instant product filtering by title
- **Category Filter**: Filter by product categories
- **Price Display**: Clear pricing with currency formatting
- **Product Grid**: Responsive grid layout

## 📱 Mobile Optimization

- **Touch-Friendly**: Large touch targets and gestures
- **Mobile Menu**: Collapsible navigation for small screens
- **Responsive Images**: Optimized image loading
- **Swipe Gestures**: Smooth interactions on mobile devices

## 🔐 Authentication (Demo)

- **Login/Signup Forms**: Placeholder authentication UI
- **User Profile**: Profile management interface
- **Protected Routes**: Route guards for authenticated content

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deploy to Platforms

This project can be deployed to:
- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag & drop the `dist` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions for automated deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Future Enhancements

- [ ] User authentication with JWT
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Product comparison feature
- [ ] Advanced filtering (price range, ratings)
- [ ] Order history and tracking
- [ ] Payment integration (Stripe/PayPal)
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Unit and integration tests

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Amirhossein** - *front Developer*

- LinkedIn: []
- Portfolio: []
- Email: [amir.slv.dev@gmail.com.com]

---

⭐ **Star this repo** if you found it helpful!

Built with ❤️ using React and modern web technologies.
