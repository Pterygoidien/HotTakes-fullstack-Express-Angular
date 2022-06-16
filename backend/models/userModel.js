const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "VALID_EMAIL_REQUIRED"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "VALID_PASSWORD_REQUIRED"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
