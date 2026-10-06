import Destination from "../models/Destination.js";
import cloudinary from "../config/cloudinary.js";



// CREATE DESTINATION (ADMIN)

export const createDestination = async (req, res) => {
  try {
    const { title, country, pricePerNight, rating, description } = req.body;

    // Validation
    if (!title || !country || !pricePerNight || !description) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    // Images required
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "Please upload at least one image",
      });
    }

    const images = req.files.map((file) => file.path);

    const destination = await Destination.create({
      title,
      country,
      pricePerNight,
      rating,
      description,
      images,
    });

    res.status(201).json(destination);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// GET ALL DESTINATIONS 

export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 });

    res.json(destinations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch destinations",
    });
  }
};



// GET SINGLE DESTINATION

export const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        message: "Destination not found",
      });
    }

    res.json(destination);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching destination",
    });
  }
};



// UPDATE DESTINATION (ADMIN)

export const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        message: "Destination not found",
      });
    }

    // Update fields
    destination.title = req.body.title || destination.title;
    destination.country = req.body.country || destination.country;
    destination.pricePerNight =
      req.body.pricePerNight || destination.pricePerNight;
    destination.rating = req.body.rating || destination.rating;
    destination.description =
      req.body.description || destination.description;

    // If new images uploaded -> delete old ones from Cloudinary
    if (req.files && req.files.length > 0) {
      for (let img of destination.images) {
        try {
          const publicId = img.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.log("Cloudinary delete failed:", err.message);
        }
      }

      destination.images = req.files.map((file) => file.path);
    }

    const updated = await destination.save();

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// DELETE DESTINATION (ADMIN)
export const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        message: "Destination not found",
      });
    }

    

    await destination.deleteOne();

    res.json({
      message: "Destination deleted successfully",
    });

  } catch (error) {
    console.log(error); 
    res.status(500).json({
      message: error.message,
    });
  }
};




// GET ALL DESTINATIONS (ADMIN PANEL)

export const getAllDestinationsAdmin = async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 });

    res.json(destinations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
