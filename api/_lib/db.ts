import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return mongoose.connection;

  let uri = process.env.MONGODB_URI || "";
  uri = uri.trim().replace(/^['"]|['"]$/g, '');

  if (!uri) {
    console.error("MONGODB_URI is not set in environments");
    throw new Error("MONGODB_URI is not set");
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Fail fast if MongoDB IP is not whitelisted
      socketTimeoutMS: 45000,
    });
    console.log("Successfully connected to MongoDB");
    return conn.connection;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
};
