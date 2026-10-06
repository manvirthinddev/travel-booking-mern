import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const { data } = await api.get("/bookings/my");
      setBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    const reason = prompt("Please enter cancellation reason:");

    if (!reason) return;

    try {
      await api.put(`/bookings/cancel/${id}`, {
        reason,
      });

      fetchMyBookings();
    } catch {
      alert("Failed to cancel booking");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-gray-500 text-lg">
        Loading your bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6 rounded-3xl">
      <h2 className="text-3xl font-extrabold mb-8">My Bookings</h2>

      {/* EMPTY STATE */}
      {bookings.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl shadow text-center">
          <h3 className="text-xl font-bold mb-3">No bookings yet ✈️</h3>

          <p className="text-gray-600 mb-6">
            Looks like you haven't planned your next trip. Start exploring
            destinations now!
          </p>

          <Link
            to="/destinations"
            className="
              px-6 py-3
              bg-black text-white
              rounded-xl
              font-semibold
              hover:scale-105
              transition
            "
          >
            Explore Destinations
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => {
            const image =
              booking.destination?.images?.[0] ||
              booking.destination?.image ||
              "https://via.placeholder.com/400x250?text=Travel";

            return (
              <div
                key={booking._id}
                className="
                  bg-white rounded-3xl shadow-lg
                  hover:shadow-2xl
                  transition
                  overflow-hidden
                  flex flex-col md:flex-row
                "
              >
                {/* IMAGE */}
                <img
                  src={image}
                  alt={booking.destination?.title}
                  className="w-full md:w-72 h-56 object-cover"
                />

                {/* CONTENT */}
                <div className="flex-1 p-6 flex flex-col md:flex-row justify-between gap-6">
                  {/* LEFT */}
                  <div>
                    <h3 className="text-xl font-bold">
                      {booking.destination?.title}
                    </h3>

                    <p className="text-gray-500 mb-3">
                      📍 {booking.destination?.country}
                    </p>

                    <p className="text-sm">
                      <b>Check-in:</b>{" "}
                      {new Date(booking.checkInDate).toLocaleDateString()}
                    </p>

                    <p className="text-sm">
                      <b>Check-out:</b>{" "}
                      {new Date(booking.checkOutDate).toLocaleDateString()}
                    </p>

                    <p className="text-sm mt-1">
                      <b>Guests:</b> {booking.guests}
                    </p>

                    {/* CANCEL */}
                    {booking.bookingStatus !== "cancelled" && (
                      <button
                        onClick={() => cancelBooking(booking._id)}
                        className="mt-4 px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col items-end justify-between">
                    <p className="text-2xl font-extrabold">
                      ₹{booking.totalPrice}
                    </p>

                    <span
                      className={`
    px-4 py-1 rounded-full text-sm font-semibold
    ${
      booking.bookingStatus === "cancelled"
        ? "bg-red-100 text-red-600"
        : booking.paymentStatus === "paid"
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
    }
  `}
                    >
                      {booking.bookingStatus === "cancelled"
                        ? "CANCELLED"
                        : booking.paymentStatus.toUpperCase()}
                    </span>

                    {/* INVOICE */}
                    <Link
                      to="/invoice"
                      state={{ booking }}
                      className="
                        mt-4 px-5 py-2
                        bg-black text-white
                        rounded-xl
                        font-semibold
                        hover:scale-105
                        transition
                      "
                    >
                      View Invoice
                    </Link>
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

export default MyBookings;
