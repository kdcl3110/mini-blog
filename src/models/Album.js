const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  title: { type: String, unique: true },
  pictures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Picture" }],
});

schema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model("Album", schema);
