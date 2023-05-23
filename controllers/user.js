import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Error email exists", 404));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return next(new ErrorHandler("Password does not match", 404));

    setCookie(user, res, 200, `Welcome back ${user.name}`);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      res.json({
        success: false,
        message: "Error User exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    setCookie(user, res, 201, "User Created");
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_URL === "Development" ? "lax" : "none",
      secure: process.env.NODE_URL === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "User logged out",
    });
};

export const getMyProfile = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};
