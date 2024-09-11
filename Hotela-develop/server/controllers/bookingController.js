import { response } from "express";
import bookings from "../models/bookingModel.js";
import roomType from "../models/roomType.js";
import users from "../models/userModel.js";
import axios from "axios";
import crypto from "crypto";
import Stripe from "stripe";

const stripe = new Stripe(`${process.env.STRIPE_TEST_URL}`);
const cryptomusAPI = process.env.CRYPTOMUS_API_KEY;
const merchantId = process.env.MERCHANT_ID;
const cryptomusPaymentEndpoint = process.env.CRYPTOMUS_URL;
// get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const data = await bookings
      .find()
      .populate("userId")
      .populate("hotel")
      .populate("rooms")
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTotalRevenue = async (req, res) => {
  try {
    const bookingTotal = await bookings.find();
    const totalRevenue = bookingTotal.reduce(
      (sum, booking) => sum + booking.price,
      0,
    );
    res.status(200).json({ total: totalRevenue });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
// get all users bookings
export const getUserBookings = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    const data = await bookings
      .find({ userId: user._id })
      .populate("hotel")
      .populate({
        path: "hotel",
        populate: {
          path: "location",
          model: "Location",
        },
      })
      .populate("rooms")
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// getting details of a particular booking
export const getSingleBookings = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await bookings
      .findById(id)
      .populate("userId")
      .populate("hotelId")
      .populate("rooms")
      .exec();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// add a new booking
export const newBooking = async (req, res) => {
  try {
    const { userId, hotel, rooms, price, checkIn, checkOut, totalGuest } =
      req.body;
    console.log("req.body:", req.body);

    const activeUser = await users.findOne({ _id: userId });
    console.log("User:", activeUser);

    const roomData = await roomType.findOne({ _id: rooms });
    console.log("roomData:", roomData);

    // check for  available rooms
    if (roomData.noOfRooms <= 0) {
      console.log("Room not available");
      return res.status(404).json({ message: "Room is not available" });
    }
    // checking if the total guest matches the maximum occupancy of the room

    if (totalGuest > roomData.maxOccupancy) {
      console.log("Occupancy exceeded");

      return res.status(404).json({
        message: `Sorry the number of guest is above the maximum occupancy of this room`,
      });
    }

    // awarding point based on the type of room selected
    switch (roomData.category) {
      case "Standard":
        activeUser.points += 2.3;
        break;
      case "Deluxe":
        activeUser.points += 4.99;
        break;
      case "Suite":
        activeUser.points += 6.99;
        break;
      case "Luxury":
        activeUser.points += 9.99;
        break;
      default:
        return (activeUser.points = 0);
    }

    const bookedData = await bookings.create({
      hotel,
      userId,
      rooms,
      price,
      checkIn,
      checkOut,
      totalGuest,
    });
    // takes note of the total number of rooms after booking was successful
    roomData.noOfRooms--;
    await roomData.save();
    await activeUser.save();

    res.status(200).json(bookedData);
  } catch (err) {
    console.log(err);
    console.log(err.message);

    res.status(500).json({ message: err.message });
  }
};
// stripe payment methods
export const stripePayment = async (req, res) => {
  try {
    const { hotel, rooms, price, checkIn, checkOut, totalGuest } = req.body;
    const user = req.user;
    const roomDetails = await roomType
      .findOne({ _id: rooms })
      .populate("hotel")
      .exec();
    console.log(roomDetails);

    let items = [
      {
        price_data: {
          currency: "GBP",
          product_data: {
            name: `${roomDetails.name} of ${roomDetails.hotel.name}`,
            images: [],
          },
          unit_amount: 100 * price,
        },
        quantity: 1,
      },
    ];
    const customer = await stripe.customers.create({
      email: user.email,
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customer.id,
      line_items: items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/booking-cancelled`,
      metadata: {
        userId: user._id,
        hotel,
        rooms,
        price,
        checkIn,
        checkOut,
        totalGuest,
      },
    });

    res.status(200).json(session);
  } catch (err) {
    console.log(err.message);

    res.status(500).json(err.message);
  }
};
// confirming stripe payment and saving booking to database
export const checkSessionSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
      const booking = new bookings({
        userId: session.metadata.userId,
        hotel: session.metadata.hotel,
        rooms: session.metadata.rooms,
        price: Number(session.metadata.price),
        checkIn: session.metadata.checkIn,
        checkOut: session.metadata.checkOut,
        totalGuest: Number(session.metadata.totalGuest),
        stripeSessionId: sessionId,
      });
      await booking.save();
      res.status(200).json();
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: err.message, error: "Error processing checkout" });
  }
};
//updating booking detail in payments status
export const updateBokingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const bookedDetails = await bookings.findByIdAndUpdate(id, {
      $set: { bookingStatus: req.body },
    });
    res.status(200).json(bookedDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// crypto payment
export const cryptoPayment = async (req, res) => {
  try {
    const { hotel, rooms, price, checkIn, checkOut, totalGuest } = req.body;

    const user = req.user;

    const bookedData = await bookings.create({
      hotel,
      userId: user._id,
      rooms,
      price,
      checkIn,
      checkOut,
      totalGuest,
    });
    const data = {
      amount: `${price}`,
      currency: `GBP`,
      order_id: `${bookedData._id}`,
    };
    const sign = crypto
      .createHash("md5")
      .update(
        Buffer.from(JSON.stringify(data)).toString("base64") + cryptomusAPI,
      )
      .digest("hex");
    const response = await axios.post(`${cryptomusPaymentEndpoint}`, data, {
      headers: {
        merchant: merchantId,
        sign: sign,
      },
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.log(err);

    console.log(err.message);
  }
};
export const cryptoWebhook = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err.message);
  }
};
