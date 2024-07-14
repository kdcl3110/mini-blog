const express = require("express");
const router = express.Router();
const Album = require("../models/Album");
const Picture = require("../models/Picture");

// Afficher la liste des albums
router.get("/", async (req, res) => {
  res.redirect("/");
});

router.get("/:id", async (req, res) => {
  const album = await Album.findById(req.params.id);
  const pictures = await Picture.find({ album: album._id });
  res.render("album/view", { album, pictures, title: "photos" });
});

// Formulaire pour ajouter un album
router.post("/edit/:id", async (req, res) => {
  const { title } = req.body;
  await Album.updateOne({ _id: req.params.id }, { title });
  res.redirect("/");
});

// Ajouter un album
router.post("/add", async (req, res) => {
  const { title } = req.body;
  const album = new Album({ title });
  await album.save();
  res.redirect("/");
});

// Supprimer un album
router.post("/delete/:id", async (req, res) => {
  await Album.findByIdAndDelete(req.params.id);
  await Picture.deleteMany({ album: req.params.id });
  res.redirect("/");
});

module.exports = router;
