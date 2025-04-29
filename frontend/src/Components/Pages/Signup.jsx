import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaCameraRetro } from "react-icons/fa";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
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
        const response = await axios.post("http://localhost:8080/user", formData);
        alert("Signup Successful! 🎉");
        setFormData({ username: "", email: "", password: "" });
      } catch (error) {
        alert("Signup Failed: " + error.response?.data || error.message);
      }
      setLoading(false);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-[#212121] text-white">
      {/* LEFT SLIDE - Video Background */}
      <div className="hidden md:flex md:w-1/2 h-full relative overflow-hidden">
        <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
          <source src="/videos/photography.mp4" type="video/mp4" />
        </video>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
          className="z-10 text-center mx-auto my-auto flex flex-col items-center justify-center w-full p-10">
          <FaCameraRetro className="text-[#009688] text-6xl mb-4" />
          <h1 className="text-4xl font-bold">Capture & Share Your Skills</h1>
          <p className="text-gray-400 mt-2">Join the best photography community</p>
        </motion.div>
      </div>

      {/* RIGHT SLIDE - Signup Form */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center p-8">
        <div className="bg-[#1c1c1c] p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex flex-col items-center mb-6">
            <motion.div whileHover={{ rotate: [0, 10, -10, 0] }} className="text-[#009688] text-5xl">
              <FaCameraRetro />
            </motion.div>
            <h2 className="text-3xl font-bold text-[#009688] mt-2">Join SnapSkill</h2>
            <p className="text-gray-400 text-sm">Share your passion for photography</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300">Username</label>
              <div className="relative">
                <FaUser className="absolute top-3 left-3 text-gray-400" />
                <input type="text" className="w-full px-10 py-3 bg-[#2a2a2a] text-white rounded-lg focus:ring-2 focus:ring-[#009688] outline-none" placeholder="Enter your username"
                  value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
              </div>
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-gray-300">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                <input type="email" className="w-full px-10 py-3 bg-[#2a2a2a] text-white rounded-lg focus:ring-2 focus:ring-[#009688] outline-none" placeholder="Enter your email"
                  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-gray-300">Password</label>
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input type="password" className="w-full px-10 py-3 bg-[#2a2a2a] text-white rounded-lg focus:ring-2 focus:ring-[#009688] outline-none" placeholder="Create a password"
                  value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <motion.button type="submit" className="w-full px-6 py-3 bg-[#009688] text-white rounded-lg hover:bg-[#00796B] transition font-semibold flex items-center justify-center"
              whileTap={{ scale: 0.95 }} disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </motion.button>
          </form>

          <div className="text-center my-4 text-gray-500 text-sm">— OR —</div>

          <p className="text-gray-400 text-center mt-4">Already have an account? <Link to="/login" className="text-[#009688] hover:underline">Log in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
