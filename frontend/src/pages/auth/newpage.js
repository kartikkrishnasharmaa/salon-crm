import { useState } from "react";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="relative w-full max-w-[1200px] h-[500px] overflow-hidden rounded-2xl shadow-xl">
        {/* Animated Container */}
        <motion.div
          animate={{ x: isSignUp ? "-50%" : "0%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex w-[200%] h-full"
        >
          {/* Sign In Section */}
          <div className="w-1/2 bg-white flex flex-col float-right justify-center flex-end p-10">
            <h2 className="text-2xl font-bold mb-4">Sign In</h2>
            <input
              type="email"
              placeholder="Email"
              className="border p-2 w-1/2 mb-3 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-2 w-1/2 mb-3 rounded"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded w-1/2">Login</button>
          </div>

          {/* Sign Up Section */}
          <div className="w-1/2 bg-white flex flex-col justify-center p-10">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <input
              type="text"
              placeholder="Username"
              className="border p-2 w-1/2 mb-3 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-2 w-1/2 mb-3 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-2 w-1/2 mb-3 rounded"
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded w-1/2">Register</button>
          </div>
        </motion.div>

        {/* Toggle Side */}
        <motion.div
          animate={{ x: isSignUp ? "100%" : "0%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center items-center bg-blue-500 text-white"
        >
          <h2 className="text-2xl font-bold mb-4">
            {isSignUp ? "Already have an account?" : "New here?"}
          </h2>
          <button
            className="bg-white text-blue-500 px-4 py-2 rounded"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
