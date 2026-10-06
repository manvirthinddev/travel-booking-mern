import { useEffect, useState } from "react";
import api from "../api/api";

const DestinationForm = ({ selected, onSuccess, onCancel }) => {

  //  DEFAULT EMPTY FORM
  const emptyForm = {
    title: "",
    country: "",
    pricePerNight: "",
    rating: 4.5,
    description: "",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [images, setImages] = useState([]);

  //  Autofill when editing + CLEAR when done
  useEffect(() => {
    if (selected) {
      setFormData({
        title: selected.title || "",
        country: selected.country || "",
        pricePerNight: selected.pricePerNight || "",
        rating: selected.rating || 4.5,
        description: selected.description || "",
      });
    } else {
      setFormData(emptyForm);
      setImages([]);
    }
  }, [selected]);

  // Handle text change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  //  SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // Append fields automatically
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // Require image only when creating
      if (!selected && images.length === 0) {
        alert("Please upload at least one image");
        return;
      }

      // Append images
      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }

      if (selected) {
        //  UPDATE
        await api.put(`/destinations/${selected._id}`, data);
        alert("Destination updated successfully!");
      } else {
        //  CREATE
        await api.post("/destinations", data);
        alert("Destination added successfully!");
      }

      // ⭐ RESET EVERYTHING
      setFormData(emptyForm);
      setImages([]);
      onSuccess();

    } catch (error) {
      console.log("UPLOAD ERROR:", error.response?.data || error);
      alert(
        error.response?.data?.message ||
        "Failed to upload destination"
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-8">
      <h2 className="text-xl font-bold mb-4">
        {selected ? "Edit Destination" : "Add Destination"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Title */}
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="p-3 border rounded"
          required
        />

        {/* Country */}
        <input
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className="p-3 border rounded"
          required
        />

        {/* Price */}
        <input
          name="pricePerNight"
          placeholder="Price Per Night"
          type="number"
          value={formData.pricePerNight}
          onChange={handleChange}
          className="p-3 border rounded"
          required
        />

        {/* Rating */}
        <input
          name="rating"
          placeholder="Rating"
          type="number"
          step="0.1"
          value={formData.rating}
          onChange={handleChange}
          className="p-3 border rounded"
          required
        />

        {/* FILE INPUT */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="p-3 border rounded col-span-2 cursor-pointer"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className="p-3 border rounded col-span-2"
          required
        />

        {/* BUTTONS */}
        <div className="col-span-2 flex gap-4">
          <button
            type="submit"
            className="
              px-6 py-3
              bg-blue-600
              text-white
              rounded
              hover:bg-blue-700
              cursor-pointer
              transition
            "
          >
            {selected ? "Update" : "Add"}
          </button>

          {selected && (
            <button
              type="button"
              onClick={onCancel}
              className="
                px-6 py-3
                bg-gray-300
                rounded
                hover:bg-gray-400
                cursor-pointer
                transition
              "
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DestinationForm;
