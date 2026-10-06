import { useLocation, Link } from "react-router-dom";

const Invoice = () => {
  const { state } = useLocation();
  const booking = state?.booking;

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No invoice data found.</p>
      </div>
    );
  }

  const image =
    booking.destination?.images?.[0] ||
    booking.destination?.image ||
    "https://via.placeholder.com/800x400?text=TravelBook";

  const nights =
    (new Date(booking.checkOutDate) -
      new Date(booking.checkInDate)) /
    (1000 * 60 * 60 * 24);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-20 px-4">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/*  DESTINATION IMAGE */}
        <div className="relative">
          <img
            src={image}
            alt={booking.destination?.title}
            className="h-64 w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex items-end">
            <h2 className="text-white text-3xl font-extrabold p-6">
              {booking.destination?.title},{" "}
              {booking.destination?.country}
            </h2>
          </div>
        </div>

        <div className="p-10">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-extrabold">
                TravelBook
              </h1>
              <p className="text-gray-500">
                Premium Travel Invoice
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-gray-600">
                Invoice ID
              </p>
              <p className="text-lg font-bold">
                #{booking._id.slice(-6)}
              </p>
            </div>
          </div>

          {/* USER + DATE */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="font-semibold mb-1">
                Billed To
              </h3>
              <p className="text-gray-700">
                {booking.user?.email || "Guest User"}
              </p>
            </div>

            <div className="md:text-right">
              <h3 className="font-semibold mb-1">
                Booking Date
              </h3>
              <p className="text-gray-700">
                {new Date(
                  booking.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* BOOKING TABLE */}
          <div className="rounded-2xl border overflow-hidden mb-10">
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="p-4 text-left">
                    Stay Details
                  </th>
                  <th className="p-4 text-left">
                    Guests
                  </th>
                  <th className="p-4 text-left">
                    Nights
                  </th>
                  <th className="p-4 text-right">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t">
                  <td className="p-4">
                    <p className="font-semibold">
                      {new Date(
                        booking.checkInDate
                      ).toLocaleDateString()} —{" "}
                      {new Date(
                        booking.checkOutDate
                      ).toLocaleDateString()}
                    </p>

                    <p className="text-sm text-gray-500">
                      {booking.destination?.title}
                    </p>
                  </td>

                  <td className="p-4">
                    {booking.guests}
                  </td>

                  <td className="p-4">
                    {nights}
                  </td>

                  <td className="p-4 text-right font-bold">
                    ₹{booking.totalPrice}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* TOTAL + STATUS */}
          <div className="flex flex-col md:flex-row justify-between items-center border-t pt-6 mb-10 gap-4">

            <div>
              <p className="text-gray-600">
                Payment Status
              </p>

              <span
                className={`px-4 py-1 rounded-full font-semibold
                ${
                  booking.paymentStatus === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {booking.paymentStatus.toUpperCase()}
              </span>
            </div>

            <div className="text-3xl font-extrabold">
              Total: ₹{booking.totalPrice}
            </div>

          </div>

          {/* FOOTER */}
          <div className="text-center text-gray-500 text-sm border-t pt-6">
            <p>
              Thank you for choosing TravelBook ✈️
            </p>
            <p>
              This is a digitally generated invoice.
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-10 flex justify-center gap-4">

            <button
              onClick={() => window.print()}
              className="
                px-6 py-3 rounded-xl
                bg-black text-white
                font-semibold
                hover:scale-105
                transition
              "
            >
              Download / Print
            </button>

            <Link
              to="/settings/bookings"
              className="
                px-6 py-3 rounded-xl
                border font-semibold
                hover:bg-gray-100
                transition
              "
            >
              Back to Bookings
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Invoice;
