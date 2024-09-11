import { Router } from "express";
import {
  allLocations,
  createLocation,
  singleLocation,
  updateLocation,
} from "../controllers/locationController.js";
import { upload } from "../middlewares/multer/upload.js";
const router = Router();

router.get("/", allLocations);
router.get("/:id", singleLocation);
router.post("/create", upload.single("locationImages"), createLocation);
router.patch("/:id", updateLocation);

export default router;
