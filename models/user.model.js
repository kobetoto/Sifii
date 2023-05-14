const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  wallet: [{ USD: Number, EUR: Number, YEN: Number, BTC: Number, ETH: Number }],
});

module.exports = mongoose.model("user", userSchema); //export file (module)
