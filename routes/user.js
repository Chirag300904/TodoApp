import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  register,
  getAllUsers,
  login,
  getMyProfile,
  logout,
} from "../controllers/user.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);

export default router;
