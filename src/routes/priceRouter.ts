import express from "express";
const {
  getPrices,
  setPrice,
  updatePrice,
  deletePrice,
} = require("../controllers/priceController");
const router = express.Router();

router.route("/").get(getPrices).post(setPrice);
router.route("/:id").put(updatePrice).delete(deletePrice);

module.exports = router;
