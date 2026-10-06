import { useEffect, useState } from "react";
import api from "../api/api";

const ManageBookings = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);

  const [statusFilter, setStatusFilter] = useState("all");
  const [searchEmail, setSearchEmail] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [statusFilter, searchEmail, dateFilter, allBookings]);

  const fetchBookings = async () => {
    const { data } = await api.get("/bookings");
    setAllBookings(data);
    setFilteredBookings(data);
  };

  const applyFilters = () => {
    let bookings = [...allBookings];

    if (statusFilter !== "all") {
      bookings = bookings.filter(
        (b) =>
          b.paymentStatus === statusFilter ||
          b.bookingStatus === statusFilter
      );
    }

    if (searchEmail) {
      bookings = bookings.filter((b) =>
        b.user?.email
          ?.toLowerCase()
          .includes(searchEmail.toLowerCase())
      );
    }

    if (dateFilter) {
      bookings = bookings.filter((b) => {
        const bookingDate = new Date(b.createdAt)
          .toISOString()
          .split("T")[0];
        return bookingDate === dateFilter;
      });
    }

    setFilteredBookings(bookings);
  };

  return (
    <div className="space-y-6">

      <h2 className="text-3xl font-extrabold">
        Manage Bookings
      </h2>

      {/* FILTER BAR */}
      <div className="bg-white p-5 rounded-2xl shadow grid md:grid-cols-4 gap-4">

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-3 border rounded-xl"
        >
          <option value="all">All Bookings</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <input
          type="text"
          placeholder="Search user email..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="p-3 border rounded-xl"
        />

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="p-3 border rounded-xl"
        />

        <button
          onClick={() => {
            setStatusFilter("all");
            setSearchEmail("");
            setDateFilter("");
          }}
          className="bg-black text-white rounded-xl font-semibold hover:scale-105 transition"
        >
          Reset Filters
        </button>
      </div>

      {/* BOOKINGS */}
      {filteredBookings.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No bookings found.
        </div>
      ) : (
        <div className="space-y-5">

          {filteredBookings.map((b) => {
            const isCancelled = b.bookingStatus === "cancelled";

            return (
              <div
                key={b._id}
                className={`
                  rounded-2xl p-6 flex justify-between items-center
                  shadow-md transition
                  ${
                    isCancelled
                      ? "bg-red-50 border border-red-200 opacity-80"
                      : "bg-white hover:shadow-xl"
                  }
                `}
              >
                {/* LEFT */}
                <div>
                  <p className="text-lg font-bold">
                    {b.destination?.title}
                  </p>

                  <p className="text-gray-600">
                    {b.user?.email}
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(
                      b.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="text-right space-y-2">

                  <p className="text-xl font-bold">
                    ₹{b.totalPrice}
                  </p>

                  {/* STATUS BADGES */}
                  <div className="flex gap-2 justify-end">

                    {/* PAYMENT */}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold
                        ${
                          b.paymentStatus === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {b.paymentStatus}
                    </span>

                    {/* CANCELLED */}
                    {isCancelled && (
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700">
                        Cancelled
                      </span>
                    )}

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
