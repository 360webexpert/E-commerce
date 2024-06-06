"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productcateoryController_1 = require("../controllers/productcateoryController");
const router = express_1.default.Router();
router.post('/categories', productcateoryController_1.createCategory);
router.get('/categories', productcateoryController_1.getCategories);
exports.default = router;
