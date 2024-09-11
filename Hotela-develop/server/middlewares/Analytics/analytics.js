import { Model, Document } from "mongoose";
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  addMonths,
  subWeeks,
  isWithinInterval,
  startOfWeek,
} from "date-fns";

// Used to calculate e.g total users of an application
export const getMonthlyCounts = async (model, year) => {
  const monthlyCounts = [];

  // Start from the first month after the given year to work backwards from there
  let currentDate = new Date(year + 1, 0, 1);

  // Loop over the last 12 months of the specified year
  for (let i = 0; i < 12; i++) {
    const endDate = endOfMonth(subMonths(currentDate, i + 1)); // end of the month for the i-th month before currentDate
    const startDate = startOfMonth(endDate); // start of the same month

    try {
      const monthYear = endDate.toLocaleDateString("default", {
        month: "short",
        // year: "numeric",
      });

      const total = await model.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate },
      });

      monthlyCounts.push({ month: monthYear, total });
    } catch (error) {
      console.error("Error fetching monthly counts:", error);
      throw new Error("Error fetching monthly counts");
    }
  }

  // Reverse the array to have the counts from January to December of the year
  return monthlyCounts.reverse();
};
export const getMonthlyRevenue = async (model, year, statuses) => {
  const monthlyRevenue = [];
  let startDate = new Date(year, 0, 1); // January 1 of the given year

  for (let month = 0; month < 12; month++) {
    const endDate = endOfMonth(startDate);

    try {
      const revenue = await model.aggregate([
        {
          $match: {
            checkIn: {
              $gte: startDate,
              $lte: endDate,
            },
            bookingStatus: { $in: statuses },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$price" },
          },
        },
      ]);

      const monthName = startDate.toLocaleDateString("default", {
        month: "short",
      });
      const totalRevenue = revenue.length > 0 ? revenue[0].total : 0;
      monthlyRevenue.push({ month: monthName, revenue: totalRevenue });

      startDate = addMonths(startDate, 1);
    } catch (error) {
      console.error(
        "Error fetching monthly revenue for model:",
        model.modelName,
        error,
      );
      throw new Error(`Error fetching monthly revenue for ${model.modelName}`);
    }
  }

  return monthlyRevenue;
};
