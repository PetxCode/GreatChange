const mongoose = require("mongoose");
const express = require("express");
const Model = require("./model");

const router = express.Router();

router.get("/", async (req, res) => {
  const getData = await Model.find();
  res.status(200).json({ message: "success", data: getData });
});

router.post("/", async (req, res) => {
  const getData = await Model.create(req.body);
  res.status(201).json({ message: "created", data: getData });
});

module.exports = router;
