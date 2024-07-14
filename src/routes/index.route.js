const express = require("express");
const Album = require("../models/Album");
const router = express.Router();

router.get("/", async (req, res) => {
  const albums = await Album.find().populate("pictures");
  res.render("album/list", { title: "albums", albums });
});

module.exports = router;
