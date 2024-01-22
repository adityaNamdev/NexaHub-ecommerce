const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error(
      "Encountered an error while trying to connect to MongoDB. ",
      error.message
    );
  }
};

module.exports = connectToMongoDB;
