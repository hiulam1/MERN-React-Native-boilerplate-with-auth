import app from "./app.js";
import mongoose from "mongoose";
import "dotenv/config";

const PORT = process.env.PORT || 3002;

const connectToMongoDB = async () => {
  try {
    const mongodbURL = process.env.MONGODB_URL!;
    await mongoose.connect(mongodbURL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
connectToMongoDB();

connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
