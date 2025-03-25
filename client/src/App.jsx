// client/src/App.jsx
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductPage from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import Chat from "./pages/Chat";

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductPage/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:productId"
            element={<ProductDetail/>}
          />
          <Route path="/chat/:sellerId"
          element={<Chat/>}/>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;