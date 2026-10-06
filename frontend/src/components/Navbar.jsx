import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  let isAdmin = false;

  //  Decode token to check role
  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded.role === "admin";
    } catch (error) {
      localStorage.removeItem("token");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="logo" className="h-10 w-10" />
          <span className="text-2xl font-extrabold tracking-wide text-blue-600">
            Travel<span className="text-gray-900">Book</span>
          </span>
        </Link>

        {/* MENU (Logged in users only) */}
        {isLoggedIn && (
          <ul className="hidden md:flex items-center gap-10 font-medium text-gray-700">
            <li>
              <Link to="/" className="hover:text-blue-600 transition">
                Home
              </Link>
            </li>

            <li>
              <Link to="/destinations" className="hover:text-blue-600 transition">
                Destinations
              </Link>
            </li>

            <li>
              <Link to="/bookings" className="hover:text-blue-600 transition">
                Bookings
              </Link>
            </li>

            

            <li>
              <Link to="/settings" className="hover:text-blue-600 transition">
                My Account
              </Link>
            </li>

            {/* 👑 ADMIN ONLY */}
            {isAdmin && (
              <li>
                <Link
                  to="/admin"
                  className="text-red-600 font-semibold hover:text-red-700 transition"
                >
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>
        )}

        {/* AUTH BUTTONS */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-105 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
