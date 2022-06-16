const asyncHandler = require("express-async-handler");

const Sauce = require("../models/sauceModel");
const User = require("../models/userModel");

/**
 * @desc   Get All Sauces
 * @route  GET /api/sauces
 * @access Private
 */
exports.getSauces = asyncHandler(async (req, res) => {
  const sauces = await Sauce.find();
  if (!sauces || sauces.length < 1) {
    res.status(204);
  }
  res.status(200).json(sauces);
});

/**
 * @desc   Get a specific Sauce, specified by :id
 * @route  GET /api/sauces/:id
 * @access Private
 */
exports.getSingleSauce = asyncHandler(async (req, res) => {
  const sauce = await Sauce.findOne({ _id: req.params.id });
  res.status(200).json(sauce);
});

/**
 * @desc   Post a new sauc
 * @route  POST /api/sauces
 * @access Private
 */
exports.addSauce = asyncHandler(async (req, res) => {
  const saucePost = JSON.parse(req.body.sauce);
  const sauce = await Sauce.create({
    ...saucePost,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  res.status(201).send("Sauce ajoutée !");
});

/**
 * @desc   Update an existing sauce, specified by :id
 * @route  PUT /api/sauces/:id
 * @access Private
 */
exports.updateSauce = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const sauce = await Sauce.findById(id);

  if (!sauce) {
    req.status(400);
    throw new Error("Sauce not found !");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("Error with Auth");
  }

  if (sauce.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await Sauce.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(202).send("Sauce modifiée !");
});

/**
 * @desc   Delete an existing sauce, specified by :id
 * @route  DELETE /api/sauces/:id
 * @access Private
 */
exports.deleteSauce = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const sauce = await Sauce.findById(id);
  console.log(sauce);
  if (!sauce) {
    req.status(400);
    throw new Error("Sauce not found !");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("Error with Auth");
  }

  if (sauce.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await sauce.remove();
  res.status(200).send("Sauce supprimée !");
});

exports.addLike = asyncHandler(async (req, res) => {
  const { id, like, sauceId } = req.params;
  switch (like) {
    case 1:
      break;
  }
});
