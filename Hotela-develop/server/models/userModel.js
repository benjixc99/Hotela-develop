import { Schema, model } from "mongoose";
// Defining database schema
const userSchema = new Schema(
  {
    avartar: {
      type: String,
      default: "",
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    favourites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Hotels",
      },
    ],
    phoneNumber: String,
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    points: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "User", "Hotel", "Personal-lister"],
      default: "User",
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const users = model("users", userSchema);

export default users;
