import { Schema, model } from "mongoose";

const LocationSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const location = model("Location", LocationSchema);
export default location;
