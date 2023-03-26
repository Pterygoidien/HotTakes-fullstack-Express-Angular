const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      minLength: 6,
      required: [true, "Veuillez ajouter une addresse email correcte"],
      unique: true,
      validate: {
        validator: value => {
          const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailRegex.test(value);
        },
        message: "L'email n'est pas valide",
      },
    },
    password: {
      type: String,
      required: [true, "Le mot de passe n'est pas valide"],
    },
  },
  {
    timestamps: true,
  }
);

const validateEmail = value => {
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(value);
};

module.exports = mongoose.model("User", userSchema);
