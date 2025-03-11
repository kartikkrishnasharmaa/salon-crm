const express = require("express");
const {createservice} = require("../controllers/serviceController");
const router = express.Router();

const {authMiddleware, isSalonAdmin,filterByBranch} = require("../middleware/authMiddleware");

router.post("/create-service", authMiddleware,isSalonAdmin, createservice);