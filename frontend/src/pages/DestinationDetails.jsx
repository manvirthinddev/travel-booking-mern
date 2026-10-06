import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

import {
  FaWifi,
  FaSwimmingPool,
  FaSpa,
  FaUtensils,
  FaDumbbell,
} from "react-icons/fa";

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await api.get(`/destinations/${id}`);
        setDestination(response.data);
        setSelectedImage(response.data.images?.[0]);
      } catch {
        setError("Failed to load destination details");
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  //  Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading destination...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gradient-to-br from-gray-50 to-gray-200 px-6">
      <div className="max-w-7xl mx-auto">

        {/*  IMAGE GALLERY */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-10">

          {/* Main Image */}
          <img
            src={selectedImage}
            alt={destination.title}
            className="w-full h-[450px] object-cover transition"
          />

          {/* Thumbnails */}
          <div className="flex gap-3 p-4 overflow-x-auto">
            {destination.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumb"
                onClick={() => setSelectedImage(img)}
                className={`
                  w-28 h-20 object-cover rounded-xl cursor-pointer
                  border-2 transition
                  ${
                    selectedImage === img
                      ? "border-black scale-105"
                      : "border-transparent hover:scale-105"
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* MAIN GRID*/}
        <div className="grid md:grid-cols-3 gap-10">

          {/* LEFT SIDE */}
          <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-lg">

            <h1 className="text-4xl font-extrabold mb-2">
              {destination.title}
            </h1>

            <p className="text-gray-500 mb-6">
              📍 {destination.country}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                ⭐ {destination.rating}
              </span>

              <span className="text-gray-500">
                Top rated by travelers
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed text-lg">
              {destination.description}
            </p>

            {/* HOTEL FEATURES  */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold mb-4">
                Hotel Features
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-xl">
                  <FaWifi />
                  Free WiFi
                </div>

                <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-xl">
                  <FaSwimmingPool />
                  Swimming Pool
                </div>

                <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-xl">
                  <FaSpa />
                  Spa & Wellness
                </div>

                <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-xl">
                  <FaUtensils />
                  Restaurant
                </div>

                <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-xl">
                  <FaDumbbell />
                  Fitness Center
                </div>

              </div>
            </div>

            {/*  GOOGLE MAP */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-4">
                Location
              </h3>

              <iframe
                title="map"
                src={`https://maps.google.com/maps?q=${destination.country}&output=embed`}
                className="w-full h-80 rounded-2xl border"
                loading="lazy"
              ></iframe>
            </div>

          </div>

          {/* BOOKING CARD  */}
          <div className="sticky top-32 h-fit">

            <div className="bg-white p-8 rounded-3xl shadow-xl border">

              <p className="text-gray-500 mb-2">
                Price per night
              </p>

              <h2 className="text-4xl font-extrabold mb-6">
                ₹{destination.pricePerNight}
              </h2>

              {/* CALENDAR */}
              <div className="mb-6">
                <label className="block text-gray-600 mb-1">
                  Check In
                </label>

                <input
                  type="date"
                  className="w-full border p-2 rounded-lg"
                />

                <label className="block text-gray-600 mt-3 mb-1">
                  Check Out
                </label>

                <input
                  type="date"
                  className="w-full border p-2 rounded-lg"
                />
              </div>

              <button
                onClick={() =>
                  navigate("/bookings", { state: { destination } })
                }
                className="
                  w-full
                  py-4
                  rounded-2xl
                  bg-black
                  text-white
                  font-semibold
                  cursor-pointer
                  hover:scale-105
                  transition
                "
              >
                Book Now
              </button>

              <p className="text-sm text-gray-500 mt-4 text-center">
                No hidden charges • Instant confirmation
              </p>

            </div>
          </div>
        </div>

        {/*  REVIEWS  */}
        <div className="mt-16 bg-white p-8 rounded-3xl shadow-lg">

          <h2 className="text-3xl font-bold mb-6">
            Traveler Reviews
          </h2>

          <div className="space-y-6">

            <div className="border-b pb-4">
              <p className="font-semibold">⭐ 5.0 — Rahul Sharma</p>
              <p className="text-gray-600">
                Amazing experience! The hotel was beautiful and the
                service was top-notch.
              </p>
            </div>

            <div className="border-b pb-4">
              <p className="font-semibold">⭐ 4.8 — Emily Clark</p>
              <p className="text-gray-600">
                Loved the location and amenities. Would definitely visit again!
              </p>
            </div>

            <div>
              <p className="font-semibold">⭐ 4.7 — Daniel Lee</p>
              <p className="text-gray-600">
                Very comfortable stay with great facilities.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default DestinationDetails;
