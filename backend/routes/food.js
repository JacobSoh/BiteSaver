import express from 'express';
import { verifyToken } from '../middlewares/auth-middleware.js';
import foodController from '../controllers/food-controller.js';
const router = express.Router();

router.get("/", foodController.listFoods);
router.get("/:id", foodController.listFoods);
router.post("/create", verifyToken, foodController.createFood);
router.post("/qty_update/:id", verifyToken, foodController.updateQuantity);

export default router;