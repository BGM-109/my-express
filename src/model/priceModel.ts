const mongoose = require("mongoose");

const priceSchema = mongoose.Schema(
  {
    price: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Price", priceSchema);
