import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer class="text-gray-600 body-font shadow-lg bg-gray-100">
        <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <Link
            className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
            to="/"
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/rvision-fd77e.appspot.com/o/Exams-bro%20(1).png?alt=media&token=478ca041-9c98-4b2d-ba0e-24cf62d0307f"
              alt="logo"
              className="w-15 h-10"
            />
            <span className="m-3 text-xl text-gray-800">RVision</span>
          </Link>
          <p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2020 RVison—@Qubits
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
