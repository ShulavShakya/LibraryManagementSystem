import mongoose from "mongoose";

const dbConnection = async (req, res) => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
    };

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed");
    console.log("Try again in 5 seconds");

    setTimeout(() => {
      dbConnection();
    }, 5000);
  }
};
export default dbConnection;
