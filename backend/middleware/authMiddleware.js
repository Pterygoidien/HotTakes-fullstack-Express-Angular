const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

exports.authGuard = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //On extrait le token du header
      token = req.headers.authorization.split(" ")[1];

      //On vérifie le token
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

      //Get user from the token
      req.user = await User.findById(verifyToken.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Non autorisé, token invalide");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Non autorisé, pas de token");
  }
});
