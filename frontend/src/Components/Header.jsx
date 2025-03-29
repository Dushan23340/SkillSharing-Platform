import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaCameraRetro } from "react-icons/fa";
import { motion } from "framer-motion";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [flash, setFlash] = useState(false);

  // Shrinking effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Flash animation on menu button click
  const handleMenuToggle = () => {
    setFlash(true);
    setMenuOpen(!menuOpen);
    setTimeout(() => setFlash(false), 300);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#212121]/90 backdrop-blur-md py-2 shadow-lg" : "bg-[#212121] py-4"
      }`}
      style={{
        backgroundImage: `url(/images/photography-bg-${isScrolled ? "2" : "1"}.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 3s ease-in-out",
      }}
    >
      {/* Flash effect when menu opens */}
      {flash && <div className="absolute inset-0 bg-white opacity-50 transition-opacity duration-200"></div>}

      <div className="container mx-auto flex justify-between items-center px-6">
        
        {/* Logo with Shutter Click Animation */}
        <Link
          to="/"
          className="flex items-center text-2xl font-extrabold text-white"
        >
          <motion.div
            whileHover={{ rotate: [0, 20, -20, 0], transition: { duration: 0.3 } }}
            className="mr-2"
          >
            <FaCameraRetro className="text-[#009688]" />
          </motion.div>
          Snap<span className="text-[#009688]">Skill</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-lg">
          {["Home", "Explore", "Courses", "Community", "Contact"].map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
            >
              <Link to={`/${item.toLowerCase()}`} className="hover:text-[#009688] transition">
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Login & Signup Buttons */}
        <div className="hidden md:flex space-x-4">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/login" className="px-5 py-2 border border-[#009688] text-white rounded-lg hover:bg-[#009688] transition">
              Login
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/signup" className="px-5 py-2 bg-[#009688] text-white rounded-lg hover:bg-[#00796B] transition">
              Sign Up
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button with Flash Effect */}
        <button onClick={handleMenuToggle} className="md:hidden text-white">
          {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-[#212121] absolute top-full left-0 w-full flex flex-col items-center py-6 space-y-4 backdrop-blur-lg"
        >
          {["Home", "Explore", "Courses", "Community", "Contact"].map((item) => (
            <motion.div key={item} whileHover={{ scale: 1.1 }}>
              <Link to={`/${item.toLowerCase()}`} className="text-white text-lg hover:text-[#009688]" onClick={() => setMenuOpen(false)}>
                {item}
              </Link>
            </motion.div>
          ))}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/login" className="px-5 py-2 border border-[#009688] text-white rounded-lg hover:bg-[#009688] transition" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
          <Link
  to="/signup"
  className="px-5 py-2 bg-[#009688] text-black rounded-lg hover:bg-[#00796B] hover:text-white transition duration-300"
  onClick={() => setMenuOpen(false)}
>
  Sign Up
</Link>








          </motion.div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;  