const express = require("express");
const router = express.Router();
const Album = require("../models/album");

// Afficher la liste des albums
router.get("/", async (req, res) => {
  const albums = await Album.find();
  res.render("albums/list", { albums });
});

// Formulaire pour ajouter un album
router.get("/add", (req, res) => {
  res.render("albums/add");
});

// Ajouter un album
router.post("/add", async (req, res) => {
  const { title, banner } = req.body;
  const album = new Album({ title, banner });
  await album.save();
  res.redirect("/albums");
});

// Supprimer un album
router.post("/delete/:id", async (req, res) => {
  await Album.findByIdAndDelete(req.params.id);
  res.redirect("/albums");
});

// Voir un album
router.get("/:id", async (req, res) => {
  const album = await Album.findById(req.params.id).populate("pictures");
  res.render("albums/view", { album });
});

module.exports = router;
