const mongoose = require("mongoose");

function connectDB() {
  const dbURI = process.env.MONGO_URI;
  try {
    mongoose.connect(dbURI);

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "MongoDB COnnection Failed"));
    db.once("open", function() {
      console.log("DB Connected...")
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

module.exports = connectDB;