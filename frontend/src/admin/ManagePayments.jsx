import { useEffect, useState } from "react";
import api from "../api/api";

const ManagePayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const { data } = await api.get("/bookings");
      setPayments(data);
    } catch (error) {
      console.error("Failed to fetch payments", error);
    } finally {
      setLoading(false);
    }
  };

  // MARK AS PAID
  const markAsPaid = async (id) => {
    await api.put(`/bookings/${id}/status`, {
      paymentStatus: "paid",
    });

    fetchPayments();
  };

  // CANCEL BOOKING (does NOT delete)
  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    await api.put(`/bookings/${id}/status`, {
      bookingStatus: "cancelled",
    });

    fetchPayments();
  };

  // DELETE (ADMIN ONLY )
  const deleteBooking = async (id) => {
    if (!window.confirm("Delete permanently? This cannot be undone."))
      return;

    await api.delete(`/bookings/${id}`);
    fetchPayments();
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading payments...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <h2 className="text-3xl font-extrabold">
        Payments Management
      </h2>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-5">User</th>
              <th className="p-5">Destination</th>
              <th className="p-5">Amount</th>
              <th className="p-5">Payment</th>
              <th className="p-5">Booking</th>
              <th className="p-5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => {
              const isCancelled =
                p.bookingStatus === "cancelled";

              return (
                <tr
                  key={p._id}
                  className={`
                    border-t transition
                    hover:bg-gray-50
                    ${isCancelled ? "bg-red-50 opacity-80" : ""}
                  `}
                >
                  {/* USER */}
                  <td className="p-5 font-medium">
                    {p.user?.email}
                  </td>

                  {/* DESTINATION */}
                  <td className="p-5">
                    {p.destination?.title}
                  </td>

                  {/* PRICE */}
                  <td className="p-5 font-bold">
                    ₹{p.totalPrice}
                  </td>

                  {/* PAYMENT STATUS */}
                  <td className="p-5">
                    <span
                      className={`
                        px-3 py-1 rounded-full text-sm font-semibold
                        ${
                          p.paymentStatus === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {p.paymentStatus.toUpperCase()}
                    </span>
                  </td>

                  {/* BOOKING STATUS */}
                  <td className="p-5">
                    <span
                      className={`
                        px-3 py-1 rounded-full text-sm font-semibold
                        ${
                          isCancelled
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }
                      `}
                    >
                      {isCancelled
                        ? "CANCELLED"
                        : "CONFIRMED"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-5 flex gap-2 justify-center">

                    {p.paymentStatus !== "paid" &&
                      !isCancelled && (
                        <button
                          onClick={() => markAsPaid(p._id)}
                          className="
                            px-4 py-2
                            bg-green-600 text-white
                            rounded-lg
                            hover:scale-105
                            transition
                          "
                        >
                          Mark Paid
                        </button>
                      )}

                    {!isCancelled && (
                      <button
                        onClick={() =>
                          cancelBooking(p._id)
                        }
                        className="
                          px-4 py-2
                          bg-yellow-500 text-white
                          rounded-lg
                          hover:scale-105
                          transition
                        "
                      >
                        Cancel
                      </button>
                    )}

                    <button
                      onClick={() =>
                        deleteBooking(p._id)
                      }
                      className="
                        px-4 py-2
                        bg-red-600 text-white
                        rounded-lg
                        hover:scale-105
                        transition
                      "
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default ManagePayments;
