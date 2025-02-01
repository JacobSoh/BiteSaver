import express from 'express';
import { verifyToken } from '../middlewares/auth-middleware.js';
import restaurantController from '../controllers/restaurant-controller.js';
import { upload } from '../config/multer.js';
const router = express.Router();

router.get("/", restaurantController.listRestaurant);
router.get("/personal", verifyToken, restaurantController.listRestaurant);
router.post("/create/image", verifyToken, upload.single("file"), restaurantController.uploadFile);
router.post("/create", verifyToken, restaurantController.createRestaurant);

export default router;