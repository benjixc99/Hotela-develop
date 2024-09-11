import { Schema, model } from "mongoose";
import { type } from "os";

const hotelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: { type: String },
    email: { type: String, unique: true },
    address: { type: String, required: true },
    price: { type: Number, required: true },
    breakFast: { type: Boolean, default: false },
    images: [
      {
        type: String,
      },
    ],
    amenities: [],
    location: { type: Schema.Types.ObjectId, ref: "Location", required: true },
    geoLocation: {
      type: {
        type: String,
        default: "Point",
        required: true,
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
        required: true,
      },
    },

    visitors: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "users",
        },
        comments: {
          type: String,
        },
        rating: {
          type: Number,
          default: 1,
          max: 5,
        },
        date: {
          type: Date,
        },
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Hotel = model("Hotels", hotelSchema);
export default Hotel;
