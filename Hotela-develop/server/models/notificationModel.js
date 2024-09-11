import { Schema, model } from "mongoose";

const notificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    title: String,
    message: String,
    Link: String,
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const notification = model("notification", notificationSchema);

export default notification;
