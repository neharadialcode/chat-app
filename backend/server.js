import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import { connetDatabase } from "./db/connetDatabase.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
app.get("/", (req, res) => {
  // root route http://localhost:4000
  res.send("server is ready!");
});

app.use("/api/auth", authRoute);
app.listen(PORT, () => {
  connetDatabase();
  console.log("server running on port 4000");
});
