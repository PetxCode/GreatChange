const mongoose = require("mongoose");
const Model = mongoose.Schema({
  name: String,
  description: String
});

module.exports = mongoose.model("posts", Model);
