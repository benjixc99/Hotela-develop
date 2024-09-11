import mongoose from "mongoose";

export const dbConnect = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Database connection established");
  } catch (err) {
    console.log(err.message);
  }
};
