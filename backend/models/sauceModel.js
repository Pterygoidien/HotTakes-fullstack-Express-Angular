const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "VALID_EMAIL_REQUIRED"],
      unique: true,
    },
    manufacturer: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: [true, "please add a description"],
    },
    mainPepper: { type: String, required: false },
    imageUrl: {
      type: String,
      required: [true, "Please add an URL image"],
    },
    heat: { type: Number, min: 1, max: 10 },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    usersLiked: [String],
    usersDisliked: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sauce", sauceSchema);
