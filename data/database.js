import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "test",
    })
    .then(() => console.log("Database connected"))
    .catch((e) => console.log(e));
};
