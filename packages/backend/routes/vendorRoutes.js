//map endpoints to controller functions

const express = require('express');
const router = express.Router();
const vendorController = require("../controllers/vendorController");

router.get("/searchByPostcode", vendorController.searchVendorsByPostcode);
router.get("/:id", vendorController.getVendorByID);
router.get("/vendors", vendorController.getAllVendors);

module.exports = router;