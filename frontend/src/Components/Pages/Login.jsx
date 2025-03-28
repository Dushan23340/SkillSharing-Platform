import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaCameraRetro } from "react-icons/fa";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Initialize useNavigate for redirect

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email.includes("@")) newErrors.email = "Invalid email format";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);

      try {
        const loginDetails = { email: formData.email, password: formData.password };
        const response = await axios.post("http://localhost:8080/login", loginDetails);

        if (response.data.id) {
          localStorage.setItem("userId", response.data.id);
          alert("Login successful!");
          // Redirect to the home page after successful login
          navigate("/userProfile"); // Change "/home" to the desired route
        } else {
          alert("Login failed!");
        }
      } catch (err) {
        alert("Login failed! Please try again.");
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-[#212121] text-white">
      {/* LEFT SIDE - Background Video */}
      <div className="hidden md:flex md:w-1/2 h-full relative">
        <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
          <source src="/videos/login-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10 text-center mx-auto my-auto flex flex-col items-center justify-center w-full p-10 relative"
        >
          <FaCameraRetro className="text-[#009688] text-6xl mb-4" />
          <h1 className="text-4xl font-bold">Welcome Back, Photographer!</h1>
          <p className="text-gray-400 mt-2">Log in and continue your journey</p>
        </motion.div>
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center p-8">
        <div className="bg-[#1c1c1c] p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex flex-col items-center mb-6">
            <motion.div whileHover={{ rotate: [0, 10, -10, 0] }} className="text-[#009688] text-5xl">
              <FaCameraRetro />
            </motion.div>
            <h2 className="text-3xl font-bold text-[#009688] mt-2">Login to SnapSkill</h2>
            <p className="text-gray-400 text-sm">Continue sharing your photography skills</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  className="w-full px-10 py-3 bg-[#2a2a2a] text-white rounded-lg focus:ring-2 focus:ring-[#009688] outline-none"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-gray-300">Password</label>
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="password"
                  className="w-full px-10 py-3 bg-[#2a2a2a] text-white rounded-lg focus:ring-2 focus:ring-[#009688] outline-none"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <motion.button
              type="submit"
              className="w-full px-6 py-3 bg-[#009688] text-white rounded-lg hover:bg-[#00796B] transition font-semibold flex items-center justify-center"
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? "Logging In..." : "Log In"}
            </motion.button>
          </form>

          <p className="text-gray-400 text-center mt-3">
            <Link to="/forgot-password" className="text-[#009688] hover:underline">Forgot password?</Link>
          </p>

          <div className="text-center my-4 text-gray-500 text-sm">— OR —</div>

          <p className="text-gray-400 text-center mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#009688] hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
