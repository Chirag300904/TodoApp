import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.json({
      success: false,
      message: "Login First",
    });
  }

  const decoded = await jwt.verify(token, process.env.JWT_TOKEN);

  req.user = await User.findById(decoded._id);

  next();
};
