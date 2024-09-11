import { Router } from "express";
import {
  createRooms,
  getAllRooms,
  getRoomsById,
  updateRoomType,
} from "../controllers/roomsController.js";
import { upload } from "../middlewares/multer/upload.js";

const router = Router();

router.get("/allRoom/:hotelId", getAllRooms);
router.get("/roomDetails/:id", getRoomsById);
router.post(
  "/createRoom",
  upload.fields([{ name: "roomImages", maxCount: 5 }]),
  createRooms,
);
router.patch("/roomDetails/:id", updateRoomType);

export default router;
