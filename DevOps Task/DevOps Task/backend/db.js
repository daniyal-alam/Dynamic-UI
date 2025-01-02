const mongoose = require("mongoose");
const dotenv = require("dotenv"); // Environment variable management
const path = require("path"); // Path manipulation utility

// Load environment variables from config.env file
dotenv.config({ path: path.join(__dirname, ".env") });

// Retrieve MongoDB connection URI from environment variables
const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB Successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;
