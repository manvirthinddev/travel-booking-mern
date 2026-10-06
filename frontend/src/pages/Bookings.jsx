import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api";

const roomTypes = [
  {
    name: "Standard Room",
    multiplier: 1,
    desc: "Comfortable room with essential amenities.",
  },
  {
    name: "Deluxe Room",
    multiplier: 1.4,
    desc: "Larger space with balcony & premium view.",
  },
  {
    name: "Suite",
    multiplier: 1.8,
    desc: "Luxury suite with living area & top-tier services.",
  },
];

const Bookings = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const destination = state?.destination;

  const [selectedRoom, setSelectedRoom] = useState(roomTypes[0]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  //  AUTO PRICE CALCULATION
  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);

      const diff = (end - start) / (1000 * 60 * 60 * 24);

      if (diff > 0) {
        setNights(diff);

        const roomPrice =
          destination.pricePerNight * selectedRoom.multiplier;

        setTotalPrice(Math.round(diff * roomPrice));
      } else {
        setNights(0);
        setTotalPrice(0);
      }
    }
  }, [checkIn, checkOut, destination, selectedRoom]);

  if (!destination) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-6">

      {/* Icon */}
      <div className="text-7xl mb-6">
        ✈️
      </div>

      {/* Title */}
      <h2 className="text-3xl font-extrabold mb-3 text-center">
        No Booking Selected
      </h2>

      {/* Subtitle */}
      <p className="text-gray-500 mb-8 text-center max-w-md">
        Looks like you haven’t chosen a destination yet.
        Start exploring beautiful places and book your next adventure.
      </p>

      {/* CTA */}
      <button
        onClick={() => navigate("/destinations")}
        className="
          px-8 py-4
          bg-black text-white
          rounded-2xl
          font-semibold
          hover:scale-105
          transition
        "
      >
        Explore Destinations
      </button>

    </div>
  );
}


  const handleBooking = async () => {
    if (!checkIn || !checkOut || nights <= 0) {
      alert("Please select valid dates");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/bookings", {
        destination: destination._id,
        roomType: selectedRoom.name,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        guests,
        totalPrice,
      });

      navigate("/payments", {
        state: { booking: response.data.booking },
      });
    } catch {
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gradient-to-br from-gray-50 to-gray-200 px-6">

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="md:col-span-2 space-y-8">

          {/* Destination */}
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <img
              src={destination.images?.[0]}
              alt={destination.title}
              className="w-full h-72 object-cover rounded-2xl mb-6"
            />

            <h2 className="text-3xl font-extrabold">
              {destination.title}
            </h2>

            <p className="text-gray-500 mb-3">
              📍 {destination.country}
            </p>

            <p className="text-gray-700">
              {destination.description}
            </p>
          </div>

          {/* ⭐ ROOM SELECTION */}
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6">
              Select Your Room
            </h3>

            <div className="grid md:grid-cols-3 gap-4">

              {roomTypes.map((room) => {
                const price = Math.round(
                  destination.pricePerNight * room.multiplier
                );

                return (
                  <div
                    key={room.name}
                    onClick={() => setSelectedRoom(room)}
                    className={`
                      p-5 rounded-2xl border cursor-pointer transition
                      ${
                        selectedRoom.name === room.name
                          ? "border-black shadow-lg scale-105"
                          : "hover:shadow-md"
                      }
                    `}
                  >
                      <h4 className="font-bold text-lg">
                        {room.name}
                      </h4>

                      <p className="text-gray-500 text-sm mb-3">
                        {room.desc}
                      </p>

                      <p className="font-bold">
                        ₹{price} / night
                      </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT — STICKY */}
        <div className="sticky top-32 h-fit">

          <div className="bg-white rounded-3xl shadow-xl p-8 border">

            <h3 className="text-2xl font-bold mb-6">
              Booking Summary
            </h3>

            {/* Dates */}
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full mb-3 p-3 border rounded-xl"
            />

            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full mb-4 p-3 border rounded-xl"
            />

            {/* Guests */}
            <div className="flex justify-between items-center border rounded-xl p-2 mb-4">
              <button
                onClick={() =>
                  setGuests((g) => Math.max(1, g - 1))
                }
                className="px-4 text-lg font-bold"
              >
                -
              </button>

              <span className="font-semibold">
                {guests} Guests
              </span>

              <button
                onClick={() => setGuests((g) => g + 1)}
                className="px-4 text-lg font-bold"
              >
                +
              </button>
            </div>

            {/* Price */}
            <div className="border-t pt-4 mb-6 space-y-2">

              <p className="flex justify-between text-gray-600">
                <span>Nights</span>
                <span>{nights}</span>
              </p>

              <p className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </p>
            </div>

            <button
              onClick={handleBooking}
              disabled={loading}
              className="
                w-full py-4 rounded-2xl
                bg-black text-white
                font-semibold
                hover:scale-105 transition
                disabled:opacity-60
              "
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              Secure booking • No hidden fees
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Bookings;
