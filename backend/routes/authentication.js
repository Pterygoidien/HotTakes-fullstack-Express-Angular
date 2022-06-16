const express = require("express");
const router = express.Router();
const { signUp, logIn } = require("../controllers/userController");

router.get("/signup", (req, res) => {
  res.end("this must be a POST ");
});
router.post("/signup", signUp);
router.post("/login", logIn);

module.exports = router;
