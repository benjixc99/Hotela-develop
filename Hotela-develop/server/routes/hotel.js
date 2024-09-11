import { Router } from "express";
import {
  createHotel,
  deleteHotel,
  geoHotels,
  getAllHotels,
  getHotelByID,
  rateAndComment,
  searchHotels,
  updateHotel,
} from "../controllers/hotelController.js";
import { upload } from "../middlewares/multer/upload.js";
const router = Router();

router.get("/", getAllHotels);
router.get("/search", searchHotels);
router.get("/searchGeo", geoHotels);
router.get("/search/:id", getHotelByID);
router.post(
  "/addNew",
  upload.fields([{ name: "hotelImages", maxCount: 8 }]),
  createHotel,
);
router.patch("/addRating/:id", rateAndComment);
router.patch("/search/:id", updateHotel);
router.patch("/removeHotel/:id", deleteHotel);

export default router;
