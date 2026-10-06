import { useEffect, useState } from "react";
import api from "../api/api";
import DestinationForm from "./DestinationForm";

const ManageDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const { data } = await api.get("/destinations");
      setDestinations(data);
    } catch (error) {
      console.log("FETCH ERROR:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this destination?")) return;

    try {
      await api.delete(`/destinations/${id}`);
      fetchDestinations();
    } catch (error) {
      console.log("DELETE ERROR:", error);
    }
  };

  return (
    <div className="p-6">

      {/* FORM */}
      <DestinationForm
        selected={selected}
        onSuccess={() => {
          setSelected(null);
          fetchDestinations();
        }}
        onCancel={() => setSelected(null)}
      />

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Images</th>
              <th className="p-4">Title</th>
              <th className="p-4">Country</th>
              <th className="p-4">Price</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Description</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {destinations.map((d) => (
              <tr
                key={d._id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* MULTI IMAGES */}
                <td className="p-4">
                  <div className="flex gap-2 flex-wrap">
                    {d.images?.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt="destination"
                        onClick={() => window.open(img, "_blank")}
                        className="
                          w-14 h-14
                          object-cover
                          rounded-lg
                          border
                          cursor-pointer
                          hover:scale-110
                          transition
                        "
                      />
                    ))}
                  </div>
                </td>

                <td className="p-4 font-semibold">{d.title}</td>
                <td className="p-4">{d.country}</td>
                <td className="p-4 font-bold text-blue-600">
                  ₹{d.pricePerNight}
                </td>
                <td className="p-4">⭐ {d.rating}</td>
                <td className="p-4 max-w-xs truncate">
                  {d.description}
                </td>

                {/* BUTTONS */}
                <td className="p-4">
                  <div className="flex gap-2">
                    {/* EDIT */}
                    <button
                      onClick={() => setSelected(d)}
                      className="
                        bg-yellow-500
                        hover:bg-yellow-600
                        text-white
                        px-4 py-1
                        rounded
                        cursor-pointer
                        transition
                      "
                    >
                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(d._id)}
                      className="
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        px-4 py-1
                        rounded
                        cursor-pointer
                        transition
                      "
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {destinations.length === 0 && (
          <p className="p-6 text-gray-500">
            No destinations added yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageDestinations;
