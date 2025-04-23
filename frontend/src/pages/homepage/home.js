import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSpa, FaPaintBrush,FaCheckCircle, FaUserTie, FaHandSparkles, FaHeart } from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
const [menuOpen, setMenuOpen] = useState(false);
const [submenuOpen, setSubmenuOpen] = useState(false);
const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-6 px-12 shadow-lg fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <motion.h1 
            className="text-4xl font-extrabold tracking-wide" 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            SalonCRM
          </motion.h1>l\
          <nav className="hidden md:flex space-x-8 text-lg font-semibold">
            <a href="#pricing" className="hover:text-gray-300 transition duration-300">Pricing</a>
            <a href="#features" className="hover:text-gray-300 transition duration-300">Features</a>
            <div className="relative group">
              <button className="hover:text-gray-300 transition duration-300 focus:outline-none">
                Services ▼
              </button>
              <ul className="absolute left-0 w-56 bg-white text-black shadow-lg rounded-md py-2 hidden group-hover:block transition-all duration-300">
                <li><a href="#haircut" className="block px-6 py-3 hover:bg-gray-200">Haircuts</a></li>
                <li><a href="#spa" className="block px-6 py-3 hover:bg-gray-200">Spa</a></li>
              </ul>
            </div>
            <a href="#testimonials" className="hover:text-gray-300 transition duration-300">Testimonials</a>
            <a href="#contact" className="hover:text-gray-300 transition duration-300">Contact</a>
          </nav>
          <button className="md:hidden text-white text-3xl" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>
        {menuOpen && (
          <ul className="md:hidden bg-gradient-to-r from-purple-700 to-pink-600 p-6 shadow-lg text-center space-y-4 text-lg font-semibold">
            <li><a href="#pricing" className="block text-white">Pricing</a></li>
            <li><a href="#features" className="block text-white">Features</a></li>
            <li><a href="#testimonials" className="block text-white">Testimonials</a></li>
            <li><a href="#contact" className="block text-white">Contact</a></li>
          </ul>
        )}
      </header>
      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center flex items-center justify-center text-center px-4" style={{ backgroundImage: "url('/salonbackground.png')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.div className="relative z-10 text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h2 className="text-5xl font-bold mb-4">Transform Your Salon Business</h2>
          <p className="text-lg mb-6">Manage appointments, employees, and customers with ease.</p>
          <a href="/salon-admin/login" className="px-6 py-2 bg-red-500 text-white rounded-lg mb-4 w-auto">SALON ADMIN LOGIN</a>
        </motion.div>
      </section>
  
      <div className="absolute bg-black opacity-50"></div>
      <div className="relative max-auto mb-6 flex justify-center items-center">
        <div className="bg-white shadow-lg p-8 rounded-md shadow-cyan-600 hover:shadow-indigo-700 transition duration-200">
          {/* 4 Column Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
            <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg">
              <a href="/login" className="px-6 py-2 bg-blue-500 text-white rounded-lg mb-4 w-auto">SUPER ADMIN LOGIN</a>
              <a href="/signup" className="px-6 py-2 bg-green-500 text-white rounded-lg mb-4 w-auto">SUPER ADMIN SIGNUP</a>
            </div>
            <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg">
              <a href="/salon-admin/login" className="px-6 py-2 bg-red-500 text-white rounded-lg mb-4 w-auto">SALON ADMIN LOGIN</a>
            </div>
            <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg">
              <a href="/signup" className="px-6 py-2 bg-pink-500 text-white rounded-lg mb-4 w-auto">MANAGER ADMIN SIGNIN</a>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-700 to-pink-600 text-white py-10 px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">About Us</h3>
            <p className="text-sm">We provide the best salon management solution to streamline appointments, staff, and customers.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Services</h3>
            <ul className="space-y-2">
              <li><a href="#haircut" className="hover:text-gray-300">Haircuts</a></li>
              <li><a href="#spa" className="hover:text-gray-300">Spa Treatments</a></li>
              <li><a href="#makeup" className="hover:text-gray-300">Makeup Services</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#pricing" className="hover:text-gray-300">Pricing</a></li>
              <li><a href="#features" className="hover:text-gray-300">Features</a></li>
              <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <ul className="space-y-2">
              <li><a href="#facebook" className="hover:text-gray-300">Facebook</a></li>
              <li><a href="#instagram" className="hover:text-gray-300">Instagram</a></li>
              <li><a href="#twitter" className="hover:text-gray-300">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 border-t border-white pt-5">
          <p className="text-sm">&copy; {new Date().getFullYear()} SalonCRM. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;