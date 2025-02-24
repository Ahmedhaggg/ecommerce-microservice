"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const index_1 = require("../models/index");
const repository_1 = require("./base/repository");
class ProductRepository extends repository_1.Repository {
    constructor() {
        super(index_1.ProductModel);
    }
}
exports.ProductRepository = ProductRepository;
