import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <header className="text-gray-800 bg-white shadow-md body-font min-w-full lg:rounded-xl">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
            to="/"
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/rvision-fd77e.appspot.com/o/Exams-bro%20(1).png?alt=media&token=478ca041-9c98-4b2d-ba0e-24cf62d0307f"
              alt="logo"
              className="w-24 h-24"
            />
            <span className="m-3 text-xl text-gray-800">RVision</span>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <h2 className="last:pr-24 cursor-pointer transition duration-100 transform hover:scale-125 hover:text-gray-700 active:text-blue-400">
              <Link to="/" className="m-5 hover:text-blue-800">
                Home
              </Link>
            </h2>
            <h2
              key={1}
              className="last:pr-24 cursor-pointer transition duration-100 transform hover:scale-125 hover:text-gray-700 active:text-blue-400"
            >
              <Link to="/about" className="m-5 hover:text-blue-800">
                About
              </Link>
            </h2>
            <h2
              key={1}
              className="last:pr-24 cursor-pointer transition duration-100 transform hover:scale-125 hover:text-gray-700 active:text-blue-400"
            >
              <Link to="/studentSignIn" className="m-5 hover:text-blue-800">
                Student Login
              </Link>
            </h2>
            <h2
              key={1}
              className="last:pr-24 cursor-pointer transition duration-100 transform hover:scale-125 hover:text-blue-700 active:text-blue-400"
            >
              <Link to="/facultySignIn" className="m-5 hover:text-blue-800">
                Faculty Login
              </Link>
            </h2>
            <h2
              key={1}
              className="last:pr-24 cursor-pointer transition duration-100 transform hover:scale-125 hover:text-gray-700 active:text-blue-400"
            >
              <Link to="/adminSignIn" className="m-5 hover:text-blue-800">
                Admin Login
              </Link>
            </h2>
            <h2
              key={1}
              className="last:pr-24 cursor-pointer transition duration-100 transform hover:scale-125 hover:text-gray-700 active:text-blue-400"
            >
              <Link to="/signup" className="m-5 hover:text-blue-800">
                Sign Up
              </Link>
            </h2>
          </nav>
        </div>
      </header>
    </>
  );
}
