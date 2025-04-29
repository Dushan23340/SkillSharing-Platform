import React from "react";
import { Link } from "react-router-dom";
import { FaCameraRetro, FaUsers, FaImages } from "react-icons/fa";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-[#212121] text-white">
    {/* HERO SECTION WITH BACKGROUND VIDEO */}
    <section className="relative flex flex-col items-center justify-center h-screen w-screen text-center">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
         {/* Hero Content */}
         <div className="relative z-10 px-6">
          <motion.h1
            className="text-5xl sm:text-7xl font-extrabold text-[#009688] mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to SnapSkill
          </motion.h1>
          <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto">
            Capture moments, share your skills, and learn from photography enthusiasts worldwide.
          </p>
          {/* Centered Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/signup"
              className="bg-[#009688] text-white px-8 py-4 rounded-lg shadow-lg text-lg font-semibold hover:bg-[#00796B] transition duration-300"
            >
              Get Started
            </Link>
            <Link
              to="/explore"
              className="bg-gray-800 text-white px-8 py-4 rounded-lg shadow-lg text-lg font-semibold hover:bg-gray-900 transition duration-300"
            >
              Explore Photos
            </Link>
          </div>
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section className="py-20 px-6 text-center">
        <motion.h2
          className="text-4xl font-bold text-[#009688] mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Platform Features
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            className="flex flex-col items-center bg-[#1c1c1c] p-8 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <FaCameraRetro size={50} className="text-[#009688] mb-4" />
            <h3 className="text-2xl font-semibold">Post Photos</h3>
            <p className="text-gray-400 text-center">
              Showcase your best shots & inspire others.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center bg-[#1c1c1c] p-8 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <FaUsers size={50} className="text-[#009688] mb-4" />
            <h3 className="text-2xl font-semibold">Follow Creators</h3>
            <p className="text-gray-400 text-center">
              Connect with photographers & grow your network.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center bg-[#1c1c1c] p-8 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <FaImages size={50} className="text-[#009688] mb-4" />
            <h3 className="text-2xl font-semibold">Learn & Earn</h3>
            <p className="text-gray-400 text-center">
              Monetize your skills & teach others.
            </p>
          </motion.div>
        </div>
      </section>

      {/* LATEST POSTS */}
      <section className="py-20 bg-[#1c1c1c] text-center">
        <motion.h2
          className="text-4xl font-bold text-[#009688] mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Latest Posts
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <img
              src="/images/sample1.jpg"
              alt="Post 1"
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">Sunset Photography</h3>
            <p className="text-gray-400">By Alex Smith</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <img
              src="/images/sample2.jpg"
              alt="Post 2"
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">Urban Night Lights</h3>
            <p className="text-gray-400">By Emma Brown</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <img
              src="/images/sample3.jpg"
              alt="Post 3"
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">Nature Wonders</h3>
            <p className="text-gray-400">By John Doe</p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 bg-[#009688] text-center">
        <motion.h2
          className="text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Join the Community
        </motion.h2>
        <p className="text-lg text-white mb-6">
          Become part of a growing network of photographers & enthusiasts.
        </p>
        <Link
          to="/signup"
          className="px-6 py-3 bg-white text-[#009688] rounded-lg shadow-lg hover:bg-gray-200 transition"
        >
          Sign Up Now
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1c1c1c] py-6 text-center text-gray-400">
        <p>&copy; 2025 SnapSkill. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
