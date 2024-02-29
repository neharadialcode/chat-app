import mongoose from "mongoose";

export const connetDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("mongodb connected");
  } catch (error) {
    console.log("mngoDB connection fails");
  }
};
