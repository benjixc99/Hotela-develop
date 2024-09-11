import { Schema, model } from "mongoose";
const RoomTypeSchema = new Schema(
  {
    hotel: { type: Schema.Types.ObjectId, ref: "Hotels", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: {
      type: String,
      enum: ["Standard", "Deluxe", "Suite", "Luxury"],
      required: true,
    },
    description: { type: String },
    amenities: [
      {
        type: String,
      },
    ],
    noOfRooms: {
      type: Number,
      required: true,
    },
    maxOccupancy: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const roomType = model("RoomType", RoomTypeSchema);
export default roomType;
