import React, { useState } from "react";
import logo from "../../assests/salon-logo.png";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <img src={logo} />
      <div className="ml-20">
      <div>
        <a href="/login"
          class="w-46 inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
                  rounded-lg transition duration-200 hover:bg-indigo-600 ease"
        >
          SIGNIN
        </a>
      </div>
      <div>
        <a href="/signup"
          class="w-full mt-6 inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
                  rounded-lg transition duration-200 hover:bg-indigo-600 ease"
        >
          SIGNUP
        </a>
      </div>
      </div>
     
    </div>
  );
};

export default Home;
