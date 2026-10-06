import { NavLink, Outlet } from "react-router-dom";

const Settings = () => {
  return (
    <div className="min-h-screen pt-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* SIDEBAR */}
        <aside className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-6">Account Settings</h2>

          <nav className="space-y-4">
            <NavLink to="profile" className="block text-gray-700 hover:text-blue-600">
              Profile
            </NavLink>
            <NavLink to="bookings" className="block text-gray-700 hover:text-blue-600">
              My Bookings
            </NavLink>
            <NavLink to="password" className="block text-gray-700 hover:text-blue-600">
              Change Password
            </NavLink>
          </nav>
        </aside>

        {/* CONTENT */}
        <main className="md:col-span-3 bg-white rounded-2xl shadow p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Settings;
