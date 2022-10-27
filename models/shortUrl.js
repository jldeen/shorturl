const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now,
  },
  email: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
