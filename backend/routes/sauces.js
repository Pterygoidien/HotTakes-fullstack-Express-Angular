const express = require("express");
const router = express.Router();

const sauceController = require("../controllers/sauceController");

const { authGuard } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/multerMiddleware");

router
  .route("/")
  .get(authGuard, sauceController.getSauces)
  .post(authGuard, upload.single("image"), sauceController.addSauce);

router
  .route("/:id")
  .get(authGuard, sauceController.getSingleSauce)
  .put(authGuard, upload.single("image"), sauceController.updateSauce)
  .delete(authGuard, sauceController.deleteSauce);

module.exports = router;
