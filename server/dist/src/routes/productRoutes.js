"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const router = (0, express_1.Router)();
router.get("/", productController_1.getProducts); /// http://localhost:8000/dashboard/metrics
router.post("/", productController_1.createProducts);
exports.default = router;
