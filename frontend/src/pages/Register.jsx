import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 pt-24 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8">

        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Create Account 
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Start your travel journey with us
        </p>

        <form className="space-y-4">
          <input type="text" placeholder="Full Name"
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input type="email" placeholder="Email Address"
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input type="password" placeholder="Password"
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input type="password" placeholder="Confirm Password"
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:scale-105 transition">
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
