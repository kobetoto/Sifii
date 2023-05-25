const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  USD: Number,
  EUR: Number,
  YEN: Number,
  BTC: Number,
  ETH: Number,
});

module.exports = mongoose.model("wallet", walletSchema); //export file (
