const mongoose = require("mongoose");

const pictureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: String,
  album: { type: mongoose.Schema.Types.ObjectId, ref: "Album" },
});

module.exports = mongoose.model("Picture", pictureSchema);