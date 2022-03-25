const mongoose = require("mongoose");

const priceSchema = mongoose.Schema(
  {
    text: {
      type: String,
      require: [true, "Plz add text"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Price", priceSchema);
