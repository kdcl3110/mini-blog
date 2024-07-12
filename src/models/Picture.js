const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  body: { type: String, required: true },
  rate: { type: Number, required: true },
});

const pictureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: String,
  rate: { type: Number, default: 0 },
  album: { type: mongoose.Schema.Types.ObjectId, ref: "Album" },
  comments: [commentSchema],
});

module.exports = mongoose.model("Picture", pictureSchema);