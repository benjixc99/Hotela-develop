import Hotel from "../models/hotelModel.js";
import location from "../models/locationModel.js";

// Get all hotels
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({ isDeleted: false });
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//search hotel properties
export const searchHotels = async (req, res) => {
  try {
    const { name, locationName, minRating, minPrice, maxPrice } = req.query;

    // Find the area based on the location name
    const area = await location.findOne({
      name: { $regex: new RegExp(locationName, "i") },
    });

    if (!area) {
      return res.status(404).json({ message: "Location not found" });
    }

    // Build the filter object
    const filter = { location: area._id };

    if (name) {
      filter.name = { $regex: new RegExp(name, "i") }; // Case-insensitive search
    }

    // Add price filtering if minPrice or maxPrice is provided
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) {
        filter.price.$gte = parseFloat(minPrice); // Filter by minimum price
      }
      if (maxPrice) {
        filter.price.$lte = parseFloat(maxPrice); // Filter by maximum price
      }
    }
    // Find hotels based on the filter
    let hotels = await Hotel.find(filter)
      .populate("location")
      .sort({ createdAt: -1 })
      .exec();

    const transformedData = hotels
      .map((hotel) => {
        const totalRating = hotel.visitors.reduce(
          (acc, hotel) => acc + hotel.rating,
          0,
        );
        const averageRating =
          hotel?.visitors?.length > 0
            ? totalRating / hotel?.visitors?.length
            : 0;
        return {
          _id: hotel._id,
          name: hotel.name,
          images: hotel.images,
          location: hotel?.location?.name,
          geoLocation: hotel?.geoLocation,
          breakFast: hotel?.breakFast,
          price: hotel.price,
          amenities: hotel?.amenities,
          totalRating: totalRating,
          averageRating: averageRating,
          visitorCount: hotel?.visitors?.length,
          createdAt: hotel.createdAt,
        };
      })
      .filter((hotel) => {
        // If minRating is provided, filter hotels based on averageRating; otherwise, return all hotels
        if (minRating) {
          const min = parseFloat(minRating);
          const max = min + 0.99;
          return hotel.averageRating >= min && hotel.averageRating < max;
        }
        return true; // No minRating provided, return all hotels
      });

    res.status(200).json(transformedData);
  } catch (err) {
    console.log(err.message);

    res.status(500).json({ message: err.message });
  }
};

// Search by GeoLocation --Google Map or MapBOX
export const geoHotels = async (req, res) => {
  try {
    // Query Params for Longitude and Latitude
    const { lng, lat } = req.query;

    if (!lng || !lat) {
      return res
        .status(400)
        .json({ message: "Longitude and Latitude are required" });
    }

    const longitude = parseFloat(lng);
    const latitude = parseFloat(lat);

    if (isNaN(longitude) || isNaN(latitude)) {
      return res.status(400).json({ message: "Invalid Longitude or Latitude" });
    }

    const hotels = await Hotel.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          distanceField: "dist.calculated",
          maxDistance: 2000, // 2 kilometers
          includeLocs: "dist.location",
          spherical: true,
        },
      },
    ]);

    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get specific properties or hotel
export const getHotelByID = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id)
      .populate("location")
      .populate("visitors.userId")
      .exec();
    const totalRating = hotel.visitors.reduce(
      (acc, visitor) => acc + visitor.rating,
      0,
    );
    const averageRating = totalRating / (hotel.visitors.length || 1); // Avoid division by zero
    console.log("Total Rating", totalRating);
    console.log("Hotel Rating", averageRating);

    res.status(200).json({ hotel, averageRating });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create hotel
export const createHotel = async (req, res) => {
  try {
    const {
      name,
      email,
      price,
      description,
      address,
      amenities,
      location,
      breakFast,
      geoLocation,
    } = req.body;

    // login for multiple images
    const images =
      req.files && req.files["hotelImages"]
        ? req.files["hotelImages"].map((file) => file.path)
        : [];
    const newHotel = await Hotel.create({
      name,
      description,
      email,
      price,
      address,
      images,
      amenities,
      location,
      geoLocation,
      breakFast,
    });
    res.status(201).json(newHotel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update hotel data
export const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = await Hotel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true },
    );
    res.status(200).json(updatedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Rate and comment a hotel
export const rateAndComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, comments, rating, date } = req.body;

    const hotela = await Hotel.findById(id);
    // Check if a user has rated and commented in a specific hotel
    const existingRating = hotela.visitors.some((check) =>
      check.userId.equals(userId),
    );
    if (existingRating) {
      return res.status(401).json({ message: "Your feedback exist" });
    }
    // Comment and rate
    const newData = await Hotel.findByIdAndUpdate(
      id,
      {
        $push: {
          visitors: { userId, comments, rating, date: Date.now() },
        },
      },
      { new: true },
    );
    res.status(200).json(newData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a hotel (Using soft delete method)
export const deleteHotel = async (req, res) => {
  try {
    // Performing soft delete
    const { id } = req.params;
    await Hotel.findByIdAndUpdate(id, {
      $set: { isDeleted: true },
    });
    res.status(200).json("Deleted Successfully");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
