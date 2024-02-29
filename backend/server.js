import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connetDatabase } from "./db/connetDatabase.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 4000;
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  connetDatabase();
  console.log("server running on port 4000");
});

// app.get("/", (req, res) => {
//   root route http://localhost:4000
//   res.send("server is ready!");
// });
