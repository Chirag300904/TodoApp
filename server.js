import { connectDB } from "./data/database.js";
import { app } from "./app.js";

// Connecting Database
connectDB();

// Listening Server
app.listen(process.env.PORT, (req, res) => {
  console.log(
    `Server is running at port ${process.env.PORT} in ${process.env.NODE_URL} mode`
  );
});
