const express = require("express");
const router = express.Router();
const Picture = require("../models/Picture");
const Album = require("../models/Album");
const upload = require("../utils/multer");

// Formulaire pour ajouter une photo
router.get("/add/:albumId", async (req, res) => {
  const album = await Album.findById(req.params.albumId);
  res.render("pictures/add", { album });
});

// Ajouter une photo
router.post("/add/:albumId", upload.single("picture"), async (req, res) => {
  try {

    console.log(req.body);
    const { title, description } = req.body;
    const url = `/images/${req?.file?.filename}`;
    const album = await Album.findById(req.params.albumId);
    const picture = new Picture({
      title,
      description,
      url,
      album: album._id,
    });
    await picture.save();

    album.pictures = [...album.pictures, picture._id];
    await album.save();

    res.redirect(`/albums/${album._id}`);
  } catch (error) {
    console.log(error);
  }
});

router.post("/edit/:pictureId", upload.single("picture"), async (req, res) => {
  const data = { ...req.body };
  if (req?.file) data.url = `/images/${req?.file?.filename}`;
  const picture = await Picture.findOneAndUpdate(
    { _id: req.params.pictureId },
    data,
    { new: true }
  );
  res.redirect(`/albums/${picture.album}`);
});

// Supprimer une photo
router.post("/delete/:id", async (req, res) => {
  const picture = await Picture.findById(req.params.id);
  await Picture.findByIdAndDelete(req.params.id);
  res.redirect(`/albums/${picture.album}`);
});

// Voir une photo
router.get("/:id", async (req, res) => {
  const picture = await Picture.findById(req.params.id).populate("album");
  res.render("pictures/view", { picture });
});

module.exports = router;
