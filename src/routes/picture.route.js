const express = require("express");
const router = express.Router();
const Picture = require("../models/picture");
const Album = require("../models/album");

// Formulaire pour ajouter une photo
router.get("/add/:albumId", async (req, res) => {
  const album = await Album.findById(req.params.albumId);
  res.render("pictures/add", { album });
});

// Ajouter une photo
router.post("/add/:albumId", async (req, res) => {
  const { title, url, description, rate } = req.body;
  const album = await Album.findById(req.params.albumId);
  const picture = new Picture({ title, url, description, rate, album: album._id });
  await picture.save();
  res.redirect(`/albums/${album._id}`);
});

// Supprimer une photo
router.post("/delete/:id", async (req, res) => {
  const picture = await Picture.findById(req.params.id);
  await Picture.findByIdAndDelete(req.params.id);
  res.redirect(`/albums/${picture.album}`);
});

// Ajouter un commentaire
router.post("/comment/:id", async (req, res) => {
  const { body, rate } = req.body;
  const picture = await Picture.findById(req.params.id);
  picture.comments.push({ body, rate });
  await picture.save();
  res.redirect(`/pictures/${req.params.id}`);
});

// Voir une photo
router.get("/:id", async (req, res) => {
  const picture = await Picture.findById(req.params.id).populate("album");
  res.render("pictures/view", { picture });
});

module.exports = router;
