import { Router } from "express";
import {
  getBookingReport,
  getHotelRevenue,
  getUsersReport,
} from "../controllers/analysis.js";

const router = Router();

router.get("/users", getUsersReport);
router.get("/booking", getBookingReport);
router.get("/revenue", getHotelRevenue);

export default router;
