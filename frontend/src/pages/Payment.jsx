import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

const Payments = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const { state } = useLocation();
  const booking = state?.booking;

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(false);

  //  Fetch destination 
  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const res = await api.get(`/destinations/${booking.destination}`);
        setDestination(res.data);
      } catch (err) {
        console.log("Failed to fetch destination");
      }
    };

    if (booking?.destination) {
      fetchDestination();
    }
  }, [booking]);

  // Payment Handler 
  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    // Fake delay to simulate payment
    setTimeout(async () => {

  try {

    //  UPDATE DATABASE
    await api.put(`/bookings/pay/${booking._id}`);

    alert("✅ Payment Successful!");

    navigate("/settings/bookings");

  } catch (err) {

    alert("Payment succeeded but failed to update booking.");

  }

}, 2000);
  };

  //  If user refreshes page
  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        No booking found.
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center">

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl w-full">

        {/*  LEFT — TRIP SUMMARY */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-extrabold mb-6">
            Your Trip Summary
          </h2>

          {/* IMAGE FIX WITH FALLBACK */}
          <img
            src={
              destination?.images?.[0] ||
              destination?.image ||
              "https://via.placeholder.com/600x400?text=Travel+Image"
            }
            alt={destination?.title}
            className="h-56 w-full object-cover rounded-2xl mb-5"
          />

          <h3 className="text-xl font-bold">
            {destination?.title || "Luxury Destination"}
          </h3>

          <p className="text-gray-500 mb-4">
            📍 {destination?.country || "World"}
          </p>

          {/* DETAILS */}
          <div className="space-y-2 text-gray-700">
            <p className="flex justify-between">
              <span>Check-in</span>
              <span>{booking.checkInDate?.slice(0,10)}</span>
            </p>

            <p className="flex justify-between">
              <span>Check-out</span>
              <span>{booking.checkOutDate?.slice(0,10)}</span>
            </p>

            <p className="flex justify-between">
              <span>Guests</span>
              <span>{booking.guests}</span>
            </p>
          </div>

          <div className="border-t my-5"></div>

          <div className="flex justify-between text-xl font-extrabold">
            <span>Total</span>
            <span>₹{booking.totalPrice}</span>
          </div>

          {/* TRUST BADGES */}
          <div className="mt-6 flex gap-3 flex-wrap">

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              🔒 Secure Payment
            </span>

            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              ✔ Verified Booking
            </span>

            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
              💳 Stripe Protected
            </span>

          </div>
        </div>

        {/*  RIGHT — PAYMENT  */}
        <div className="bg-white rounded-3xl shadow-xl p-8 h-fit">

          <h2 className="text-2xl font-extrabold mb-6">
            Complete Payment
          </h2>

          {/* CARD FIELD */}
          <div className="border rounded-xl p-4 mb-6 shadow-sm">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "18px",
                  },
                },
              }}
            />
          </div>

          {/* PAY BUTTON */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className="
              w-full py-4 rounded-2xl
              bg-black text-white
              font-semibold text-lg
              hover:scale-105
              transition
              disabled:opacity-60
            "
          >
            {loading
              ? "Processing Payment..."
              : `Pay ₹${booking.totalPrice}`}
          </button>

          {/* TEST CARD */}
          <p className="text-center text-gray-500 text-sm mt-4">
            Test Card: <b>4242 4242 4242 4242</b>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Payments;
