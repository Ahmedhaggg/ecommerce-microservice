"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
require("../config/db");
const product_model_1 = __importDefault(require("./product.model"));
exports.ProductModel = product_model_1.default;
