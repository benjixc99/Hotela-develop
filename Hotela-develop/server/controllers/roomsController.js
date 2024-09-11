import roomType from "../models/roomType.js";

// Get all roomType by based on a Hotel
export const getAllRooms = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const allRooms = await roomType.find({ hotel: hotelId });
    res.status(200).json(allRooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get specific room by ID
export const getRoomsById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await roomType.findById(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create a Room
export const createRooms = async (req, res) => {
  try {
    const {
      hotel,
      name,
      price,
      description,
      noOfRooms,
      amenities,
      category,
      maxOccupancy,
    } = req.body;
    const images = req.files["roomImages"]
      ? req.files["roomImages"].map((file) => file.path)
      : null;

    const allRooms = await roomType.create({
      hotel,
      name,
      price,
      description,
      images,
      category,
      amenities,
      noOfRooms,
      maxOccupancy,
    });
    res.status(201).json(allRooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update room details
export const updateRoomType = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDetails = await roomType.findByIdAndUpdate(id, {
      $set: req.body,
    });
    res.status(200).json(updatedDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
