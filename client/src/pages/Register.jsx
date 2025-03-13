import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  // Animation variants remain unchanged

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    focus: {
      scale: 1.02,
      boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
      borderColor: "#a855f7",
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(99, 102, 241, 0.7)",
      transition: { type: "spring", stiffness: 300 },
    },
    tap: { scale: 0.95 },
  };

  // Updated to make actual API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        email,
        password,
      });

      // Registration successful
      console.log("Registration successful:", response.data);
      navigate("/login"); // Redirect to login page after successful registration
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to register. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Updated to make actual API call
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");

    try {
      // In a real implementation, this would typically redirect to Google OAuth
      window.location.href = `${API_URL}/auth/google`;

      // Note: The redirection will stop the execution here,
      // the code below won't run until the OAuth flow returns
    } catch (err) {
      console.error("Google Sign-In error:", err);
      setError(
        err.message || "Failed to sign in with Google. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#0f172a] overflow-hidden relative"
      style={{
        background: "linear-gradient(180deg, #0f172a 0%, #050417 100%)",
      }}
    >
      {/* Background Effects - unchanged */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {/* Background code remains the same */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, #6366f1 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        />
        {/* Hexagons remain unchanged */}
        {/* ... */}
      </div>

      {/* Register Form */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md p-8 bg-gray-900/80 rounded-xl shadow-2xl border border-[#6366f1]/30"
      >
        <motion.h2
          className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent"
          style={{ textShadow: "0 0 15px rgba(99, 102, 241, 0.5)" }}
        >
          Join Aknuff
        </motion.h2>

        {/* Display error message if any */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 p-2 text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-md"
          >
            {error}
          </motion.div>
        )}

        <motion.form
          variants={formVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Form inputs remain unchanged */}
          {/* Email Input */}
          <motion.div variants={inputVariants}>
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-[#6366f1]" />
              </span>
              <motion.input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-[#6366f1]/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-all"
                whileFocus="focus"
              />
            </div>
          </motion.div>

          {/* Password Input */}
          <motion.div variants={inputVariants}>
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-[#6366f1]" />
              </span>
              <motion.input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-[#6366f1]/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-all"
                whileFocus="focus"
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2"
            style={{ boxShadow: "0 0 15px rgba(99, 102, 241, 0.3)" }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Registering...</span>
              </>
            ) : (
              <span>Register</span>
            )}
          </motion.button>
        </motion.form>

        {/* The rest of the component remains unchanged */}
        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#6366f1]/30"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-gray-900/80 px-2 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Sign-In Button */}
        <motion.button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="w-full bg-gray-800 border border-[#6366f1]/30 text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2"
          style={{ boxShadow: "0 0 15px rgba(99, 102, 241, 0.3)" }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.621h5.739c-0.231,1.239-0.924,2.316-1.947,3.093c-1.239,0.947-2.853,1.447-4.792,1.447 c-2.969,0-5.493-1.947-6.417-4.693c-0.231-0.693-0.347-1.416-0.347-2.139s0.116-1.447,0.347-2.139 c0.924-2.747,3.447-4.693,6.417-4.693c1.616,0,3.078,0.578,4.239,1.693l2.853-2.853C16.834,3.078,14.763,2,12.545,2 C7.021,2,2.543,6.478,2.543,12s4.478,10,10.002,10c5.524,0,10.002-4.478,10.002-10c0-0.693-0.116-1.416-0.347-2.139 C21.969,10.239,12.545,10.239,12.545,10.239z"
                />
              </svg>
              <span>Sign in with Google</span>
            </>
          )}
        </motion.button>

        {/* Login Link */}
        <motion.div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <motion.a
              href="/login"
              className="text-[#a855f7] hover:underline"
              whileHover={{ color: "#6366f1", scale: 1.05 }}
            >
              Login
            </motion.a>
          </p>
        </motion.div>
      </motion.div>

      {/* Cyberpunk Glow Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))",
          opacity: 0.3,
        }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );
};

export default Register;
