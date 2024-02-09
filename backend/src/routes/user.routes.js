import { Router } from "express";
import {
  addOrder,
  getOrders,
  loginUser,
  logoutUser,
  removeOrder,
  registerUser,
  updateOrder,
  getCurrentUser,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/order").post(verifyJWT, addOrder);
router.route("/order").get(verifyJWT, getOrders);
router.route("/order/:orderId").delete(verifyJWT, removeOrder);
router.route("/order/:orderId").patch(verifyJWT, updateOrder);

export default router;
