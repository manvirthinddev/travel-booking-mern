import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col justify-between">
        
        {/* TOP */}
        <div>
          <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>

          <nav className="space-y-4">
            <Link to="/admin" className="block hover:text-blue-400">
              Dashboard
            </Link>
            <Link to="/admin/destinations" className="block hover:text-blue-400">
              Destinations
            </Link>
            <Link to="/admin/bookings" className="block hover:text-blue-400">
              Bookings
            </Link>
            <Link to="/admin/payments" className="block hover:text-blue-400">
              Payments
            </Link>
          </nav>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="mt-10 px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
