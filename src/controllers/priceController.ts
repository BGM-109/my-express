import { Request, Response } from "express";

const asyncHandler = require("express-async-handler");

const Price = require("../model/priceModel");

// @desc    Get prices
// @route   GET /api/prices
// @access  Private
const getPrices = asyncHandler(async (req: Request, res: Response) => {
  const prices = await Price.find();

  res.status(200).json(prices);
});

// @desc    Set prices
// @route   POST /api/prices
// @access  Private
const setPrice = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const price = await Price.create({
    text: req.body.text,
  });

  res.status(200).json(price);
});

// @desc    Update prices
// @route   PUT /api/prices/:id
// @access  Private
const updatePrice = asyncHandler(async (req: Request, res: Response) => {
  const price = await Price.findById(req.params.id);

  if (!price) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const updatedPrice = await Price.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedPrice);
});

// @desc    Delete prices
// @route   DELETE /api/prices/:id
// @access  Private
const deletePrice = asyncHandler(async (req: Request, res: Response) => {
  const price = await Price.findById(req.params.id);

  if (!price) {
    res.status(400);
    throw new Error("Goal not found");
  }

  await price.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPrices,
  setPrice,
  updatePrice,
  deletePrice,
};
