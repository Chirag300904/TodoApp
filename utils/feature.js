import jwt from "jsonwebtoken";

export const setCookie = (user, res, status = 200, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN);

  res
    .status(status)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_URL === "Development" ? "lax" : "none",
      secure: process.env.NODE_URL === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
