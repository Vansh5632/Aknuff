import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
<<<<<<< HEAD
import Login from "./pages/Login";
import Register from "./pages/Register";
=======
import AuthPage from "./pages/Login";
>>>>>>> dd18115 (auth page)
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
<<<<<<< HEAD
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
=======
          <Route path="/login" element={<AuthPage />} />
>>>>>>> dd18115 (auth page)
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;