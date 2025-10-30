import mongoose from "mongoose";

// Function to connect to MongoDB database

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database connected")
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
  }
};
