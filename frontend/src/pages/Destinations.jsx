import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //  Fetch
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await api.get("/destinations");
        setDestinations(response.data);
        setFiltered(response.data);
      } catch {
        setError("Failed to load destinations");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  //  SEARCH + SORT
  useEffect(() => {
    let results = [...destinations];

    // Search
    if (search) {
      results = results.filter(
        (d) =>
          d.title.toLowerCase().includes(search.toLowerCase()) ||
          d.country.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    if (sort === "low") {
      results.sort((a, b) => a.pricePerNight - b.pricePerNight);
    }

    if (sort === "high") {
      results.sort((a, b) => b.pricePerNight - a.pricePerNight);
    }

    if (sort === "rating") {
      results.sort((a, b) => b.rating - a.rating);
    }

    setFiltered(results);
  }, [search, sort, destinations]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading destinations...
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

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10">

        <h1 className="text-4xl font-extrabold mb-2">
          Explore Destinations
        </h1>

        <p className="text-gray-600 mb-6">
          Find your perfect stay from our luxury collection.
        </p>

        {/*  PREMIUM SEARCH BAR */}
        <div className="bg-white p-4 rounded-2xl shadow flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Search by destination or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 border rounded-xl"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="p-3 border rounded-xl"
          >
            <option value="">Sort</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>

        </div>

        {/* Results */}
        <p className="text-gray-500 mt-3">
          {filtered.length} destinations found
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {filtered.map((place) => (
          <div
            key={place._id}
            className="
              bg-white rounded-3xl overflow-hidden
              shadow-lg hover:shadow-2xl
              hover:-translate-y-2
              transition duration-300
            "
          >

            {/* IMAGE */}
            <div className="relative overflow-hidden">
              <img
                src={place.images?.[0]}
                alt={place.title}
                className="h-56 w-full object-cover hover:scale-110 transition duration-500"
              />

              <span className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                ⭐ {place.rating}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-6">

              <h3 className="text-xl font-bold mb-1">
                {place.title}
              </h3>

              <p className="text-gray-500 mb-2">
                📍 {place.country}
              </p>

              <p className="text-gray-600 mb-4">
                Starting from{" "}
                <span className="font-bold">
                  ₹{place.pricePerNight}/night
                </span>
              </p>

              <Link
                to={`/destinations/${place._id}`}
                className="
                  block text-center
                  bg-black text-white
                  py-3 rounded-xl
                  font-semibold
                  hover:scale-105
                  transition
                "
              >
                View Details
              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
