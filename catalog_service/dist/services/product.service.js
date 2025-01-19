"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
class ProductService {
    constructor(repository) {
        this.repository = repository;
    }
    async createProduct(data) {
        return await this.repository.create(data);
    }
    async getProducts(limit, skip = 0) {
        return await this.repository.find(limit, skip);
    }
    async getProductById(id) {
        throw new Error();
    }
    async updateProductById(id, data) {
        throw new Error();
    }
    async deleteProductById(id) {
        return true;
    }
}
exports.ProductService = ProductService;
