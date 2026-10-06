import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import UltraTestimonials from "../components/UltraTestimonials";

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const { data } = await api.get("/destinations");
      setDestinations(data);
    } catch (error) {
      console.log("Error fetching destinations");
    }
  };

  const filteredDestinations = destinations.filter(
    (place) =>
      place.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative h-screen">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          className="absolute w-full h-full object-cover"
          alt="hero"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="max-w-4xl text-center bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
              Discover Your Next Adventure
            </h1>

            <p className="text-gray-200 text-lg mb-8">
              Book unforgettable trips, explore luxury destinations, and travel with confidence.
            </p>

            {/* SEARCH */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-2xl shadow-lg">
              <input
                type="text"
                placeholder="Search destination or country"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-3 rounded-xl border outline-none"
              />

              <input type="date" className="p-3 rounded-xl border outline-none" />

              <input
                type="number"
                placeholder="Guests"
                className="p-3 rounded-xl border outline-none"
              />

              <Link
                to="/destinations"
                className="
                  bg-gradient-to-r from-blue-600 to-indigo-600
                  text-white
                  rounded-xl
                  flex items-center justify-center
                  font-semibold
                  cursor-pointer
                  hover:scale-105
                  transition
                "
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-extrabold text-center mb-4">
            Featured Destinations
          </h2>

          <p className="text-center text-gray-600 mb-12">
            Hand-picked places loved by travelers
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredDestinations.slice(0, 6).map((place) => (
              <div
                key={place._id}
                className="
                  bg-white rounded-3xl overflow-hidden
                  shadow-lg
                  hover:shadow-2xl
                  hover:-translate-y-3
                  transition duration-300
                "
              >
                {/* MULTI IMAGE FIX */}
                <img
                  src={place.images?.[0]}
                  alt={place.title}
                  className="h-56 w-full object-cover hover:scale-110 transition duration-500"
                />

                <div className="p-6">
                  <h3 className="text-xl font-semibold">{place.title}</h3>
                  <p className="text-gray-600">{place.country}</p>

                  <div className="flex justify-between items-center mt-2">
                    <p className="font-bold text-blue-600">
                      ₹{place.pricePerNight} / night
                    </p>

                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                      ⭐ {place.rating}
                    </span>
                  </div>

                  <Link
                    to={`/destinations/${place._id}`}
                    className="
                      inline-block mt-4
                      text-blue-600
                      font-semibold
                      cursor-pointer
                      hover:underline
                    "
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS (NEW - VERY IMPRESSIVE) ================= */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">

          <div className="hover:scale-110 transition">
            <h3 className="text-4xl font-extrabold">500+</h3>
            <p>Happy Travelers</p>
          </div>

          <div className="hover:scale-110 transition">
            <h3 className="text-4xl font-extrabold">120+</h3>
            <p>Destinations</p>
          </div>

          <div className="hover:scale-110 transition">
            <h3 className="text-4xl font-extrabold">4.8</h3>
            <p>Average Rating</p>
          </div>

          <div className="hover:scale-110 transition">
            <h3 className="text-4xl font-extrabold">24/7</h3>
            <p>Support</p>
          </div>

        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-extrabold mb-6">
            Why Choose TravelBook?
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            TravelBook is a modern MERN-stack travel platform designed to make
            booking trips effortless. Discover destinations, manage bookings,
            and enjoy secure payments — all in one place.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">

            <div className="p-8 shadow rounded-2xl hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">
                Secure Booking
              </h3>
              <p className="text-gray-600">
                Safe payments and verified destinations.
              </p>
            </div>

            <div className="p-8 shadow rounded-2xl hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">
                Smart Dashboard
              </h3>
              <p className="text-gray-600">
                Admin-controlled system for reliability.
              </p>
            </div>

            <div className="p-8 shadow rounded-2xl hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">
                Seamless Experience
              </h3>
              <p className="text-gray-600">
                Clean UI with fast booking flow.
              </p>
            </div>

          </div>
        </div>
      </section>

      <UltraTestimonials />

    </div>
  );
};

export default Home;
