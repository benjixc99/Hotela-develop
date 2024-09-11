import {
  getMonthlyCounts,
  getMonthlyRevenue,
} from "../middlewares/Analytics/analytics.js";

import {
  startOfYear,
  endOfYear,
  getWeek,
  getMonth,
  startOfWeek,
  startOfMonth,
  format,
} from "date-fns";
import users from "../models/userModel.js";
import bookings from "../models/bookingModel.js";
export const getUsersReport = async (req, res) => {
  try {
    const { year } = req.query;
    const report = await getMonthlyCounts(users, Number(year));
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
// Checking total bookings each month
export const getBookingReport = async (req, res) => {
  try {
    const { year } = req.query;

    const report = await getMonthlyCounts(bookings, Number(year));
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
// Calculating system Revenue
export const getHotelRevenue = async (req, res) => {
  try {
    const { year } = req.query;

    const revenue = await getMonthlyRevenue(bookings, Number(year), [
      "Pending",
      "Active",
      "Expired",
    ]);
    res.status(200).json(revenue);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
