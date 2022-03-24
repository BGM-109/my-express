const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL as string);
    console.log(`MongoDB is Connected!${conn.connection.host}`);
  } catch (error: any) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
