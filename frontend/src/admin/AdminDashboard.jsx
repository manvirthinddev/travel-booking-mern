import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchRecentBookings();
  }, []);

  const fetchStats = async () => {
    const { data } = await api.get("/admin/stats");
    setStats(data);
  };

  const fetchRecentBookings = async () => {
    const { data } = await api.get("/bookings");
    setRecentBookings(data.slice(0, 5));
  };

  if (!stats) {
    return (
      <div className="flex justify-center mt-20 text-lg font-semibold">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-10">

      <h1 className="text-4xl font-extrabold">
        Admin Dashboard
      </h1>

      {/*  STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* USERS */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-3xl font-bold">
            {stats.totalUsers}
          </h2>
        </div>

        {/* DESTINATIONS */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <p className="text-gray-500">Destinations</p>
          <h2 className="text-3xl font-bold">
            {stats.totalDestinations}
          </h2>
        </div>

        {/* BOOKINGS */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <p className="text-gray-500">Total Bookings</p>
          <h2 className="text-3xl font-bold">
            {stats.totalBookings}
          </h2>
        </div>

        {/* REVENUE */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-3xl font-bold text-green-600">
            ₹{stats.totalRevenue}
          </h2>
        </div>

      </div>

      {/*  SECOND ROW */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-yellow-50 p-6 rounded-2xl shadow">
          <p className="text-gray-600">Pending Bookings</p>
          <h2 className="text-3xl font-bold text-yellow-600">
            {stats.pendingBookings}
          </h2>
        </div>

        <div className="bg-green-50 p-6 rounded-2xl shadow">
          <p className="text-gray-600">Confirmed Bookings</p>
          <h2 className="text-3xl font-bold text-green-600">
            {stats.confirmedBookings}
          </h2>
        </div>

        <div className="bg-red-50 p-6 rounded-2xl shadow">
          <p className="text-gray-600">Cancelled Bookings</p>
          <h2 className="text-3xl font-bold text-red-600">
            {stats.cancelledBookings}
          </h2>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <Link
            to="/admin/destinations"
            className="px-5 py-3 bg-black text-white rounded-lg hover:scale-105 transition"
          >
            Manage Destinations
          </Link>

          <Link
            to="/admin/bookings"
            className="px-5 py-3 bg-gray-800 text-white rounded-lg hover:scale-105 transition"
          >
            Manage Bookings
          </Link>

          <Link
            to="/admin/payments"
            className="px-5 py-3 bg-green-600 text-white rounded-lg hover:scale-105 transition"
          >
            Manage Payments
          </Link>

        </div>
      </div>

      {/* ⭐ RECENT BOOKINGS */}
      <div className="bg-white p-6 rounded-2xl shadow">

        <h2 className="text-xl font-semibold mb-4">
          Recent Bookings
        </h2>

        {recentBookings.length === 0 ? (
          <p className="text-gray-500">No bookings yet.</p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Destination</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b._id} className="border-t">

                    <td className="p-3">
                      {b.user?.email}
                    </td>

                    <td className="p-3">
                      {b.destination?.title}
                    </td>

                    <td className="p-3 font-semibold">
                      ₹{b.totalPrice}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm
                          ${
                            b.bookingStatus === "cancelled"
                              ? "bg-red-100 text-red-600"
                              : b.paymentStatus === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        `}
                      >
                        {b.bookingStatus === "cancelled"
                          ? "Cancelled"
                          : b.paymentStatus}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}
      </div>

    </div>
  );
};

export default AdminDashboard;
