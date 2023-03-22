const mongoose = require("mongoose");

const mongoDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected : ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
    console.log("couldn't connnect to mongoDB");
    process.exit(1);
  }
};

module.exports = mongoDB;
