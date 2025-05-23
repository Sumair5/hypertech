import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast'; // 🧑‍💻 For toast notifications

// 🧩 Layouts
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

// 📦 Pages
import Home from "./pages/Home";
import CartScreen from "./pages/CartScreen";
import UserDetails from "./User/UserDetails";
import Laptops from "./pages/Laptops";
import Mobiles from "./pages/Mobiles";
import Chromebooks from "./pages/Chromebooks";
import Smartwatches from "./pages/Smartwatches";
import Accessories from "./pages/Accessories";
import Reviews from "./pages/Reviews";

// 🔍 Product Info Components
import Mobilinfo from "./components/productInfo/Mobilinfo";
import Laptopinfo from "./components/productInfo/Laptopinfo";
import Chromebookinfo from "./components/productInfo/Chromebookinfo";
import Smartwatchinfo from "./components/productInfo/Smartwatchinfo";
import Accessorieinfo from "./components/productInfo/Accessorieinfo";

// 🛒 Checkout & Orders
import Checkout from "./components/Checkout";
import SuccessScreen from "./components/SuccessScreen";
import OrderList from "./User/adminPanel/OrderList";

// ⚙ Admin
import ViewProductList from "./User/adminPanel/ViewProductList";

// 🧪 Test Components
import RandomNumber from "./components/test/RandomNumber";

// 🌐 Context Providers
import { AuthProvider } from "./User/AuthContext"; // 🔐 User Authentication Context
import { ProductProvider } from "./context/ProductContext"; // 📦 Product Context (Mobile, etc)

// 🎨 Global Styles
import "./App.css";

// 🚨 Error Handling
import ErrorBoundary from "./utils/ErrorBoundary";
import NotFound from "./utils/NotFound";

function App() {
  return (
    <AuthProvider> {/* 🔐 Auth Context Provider */}
      <ProductProvider> {/* 📦 Product Context Provider */}

        <Router>
          <div className="app-container">

            {/* 🔝 Global Header */}
            <Header />

            {/* 📄 Main Content Area */}
            <main className="main-content">
              <ErrorBoundary>
                <Routes>

                  {/* === 🏠 Home === */}
                  <Route path="/" element={<Home />} />

                  {/* === 📱 Mobiles === */}
                  <Route path="/mobiles" element={<Mobiles />} />
                  <Route path="/mobiles/:brand" element={<Mobiles />} />
                  <Route path="/mobiles/mobiledetails/:bname/:mname/:id" element={<Mobilinfo />} />

                  {/* === 💻 Laptops === */}
                  <Route path="/laptops" element={<Laptops />} />
                  <Route path="/laptops/:brand" element={<Laptops />} />
                  <Route path="/laptops/laptopdetails/:bname/:mname/:id" element={<Laptopinfo />} />

                  {/* === 💻 Chromebooks === */}
                  <Route path="/chromebooks/chromebookdetails/:bname/:mname/:id" element={<Chromebookinfo />} />
                  <Route path="/chromebooks" element={<Chromebooks />} />

                  {/* === ⌚ Smartwatches === */}
                  <Route path="/smartwatches" element={<Smartwatches />} />
                  <Route path="/smartwatches/smartwatchedetails/:bname/:mname/:id" element={<Smartwatchinfo />} />

                  {/* === 🎒 Accessories === */}
                  <Route path="/accessories" element={<Accessories />} />
                  <Route path="/accessories/:category" element={<Accessories />} />
                  <Route path="/accessories/:category/:sub_category" element={<Accessories />} />
                  <Route path="/accessories/accessorydetails/:bname/:mname/:id" element={<Accessorieinfo />} />

                  {/* === 🛒 Cart, Checkout, Orders === */}
                  <Route path="/cart" element={<CartScreen />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<SuccessScreen />} />
                  <Route path="/order-list" element={<OrderList />} />

                  {/* === 👤 User === */}
                  <Route path="/userdetails" element={<UserDetails />} />

                  {/* === 🧪 Test & Review === */}
                  <Route path="/random" element={<RandomNumber />} />
                  <Route path="/reviews" element={<Reviews />} />

                  {/* === 🛠 Admin === */}
                  <Route path="/viewproductlist" element={<ViewProductList />} />

                  {/* === ❌ Not Found === */}
                  <Route path="*" element={<NotFound />} />

                </Routes>
              </ErrorBoundary>
            </main>

            {/* 🔻 Global Footer */}
            <Footer />
          </div>

          {/* 📢 Toast Notifications */}
          <Toaster position="top-center" reverseOrder={false} />
        </Router>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
