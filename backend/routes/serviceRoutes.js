const express = require("express");
const {createservice,getServicesByBranch,assignServiceToEmployee,createServiceCategory,getServiceCategories} = require("../controllers/serviceController");
const router = express.Router();

const {authMiddleware, isSalonAdmin} = require("../middleware/authMiddleware");

router.post("/create-service", authMiddleware,isSalonAdmin, createservice);
router.post("/create-service-category", authMiddleware, isSalonAdmin, createServiceCategory);

router.get("/get-service-categories", authMiddleware, isSalonAdmin, getServiceCategories);

router.get("/get-services", authMiddleware, isSalonAdmin, getServicesByBranch);
router.post("/assign-service", authMiddleware, isSalonAdmin, assignServiceToEmployee);


module.exports = router;